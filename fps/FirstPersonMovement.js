
class FirstPersonMovement {

	constructor(object, keyboardMod, keyboardMap, domElement) {

		this.object = object;
		this.target = new THREE.Vector3(0, 0, 0);

		// Possible actions
		this.MOVE_FORWARD = 1;
		this.MOVE_LEFT = 2;
		this.MOVE_BACKWARD = 3;
		this.MOVE_RIGHT = 4;
		this.MOVE_UP = 5;
		this.MOVE_DOWN = 6;
		this.FREEZE = 7;

		// Default QWERTY mapping
		var mapQWERTY = {
			38: this.MOVE_FORWARD, /*up*/
			87: this.MOVE_FORWARD, /*W*/
			37: this.MOVE_LEFT, /*left*/
			65: this.MOVE_LEFT, /*A*/
			40: this.MOVE_BACKWARD, /*down*/
			83: this.MOVE_BACKWARD, /*S*/
			39: this.MOVE_RIGHT, /*right*/
			68: this.MOVE_RIGHT, /*D*/
			82: this.MOVE_UP, /*R*/
			70: this.MOVE_DOWN, /*F*/
			81: this.FREEZE /*Q*/
		};

		// Default AZERTY mapping
		var mapAZERTY = {
			38: this.MOVE_FORWARD, /*up*/
			90: this.MOVE_FORWARD, /*Z*/
			37: this.MOVE_LEFT, /*left*/
			81: this.MOVE_LEFT, /*Q*/
			40: this.MOVE_BACKWARD, /*down*/
			83: this.MOVE_BACKWARD, /*S*/
			39: this.MOVE_RIGHT, /*right*/
			68: this.MOVE_RIGHT, /*D*/
			69: this.MOVE_UP, /*E*/
			82: this.MOVE_DOWN, /*R*/
			70: this.FREEZE /*F*/
		};

		if (keyboardMod == "AZERTY") {
			this.keyBoardMapping = mapAZERTY;
		}
		else if (keyboardMod == "QWERTY" )
		{
			this.keyBoardMapping = mapQWERTY;
		}
		else
		{
			if(keyboardMod == "CUSTOM" && keyboardMap )
			{
				this.keyBoardMapping = keyboardMap;
			}
			else{
				this.keyBoardMapping = mapQWERTY;
			}
		}




		this.domElement = (domElement !== undefined) ? domElement : document;

		this.movementSpeed = 1.0;
		this.lookSpeed = 0.005;

		this.lookVertical = true;
		this.autoForward = false;
		// this.invertVertical = false;

		this.activeLook = true;

		this.heightSpeed = false;
		this.heightCoef = 1.0;
		this.heightMin = 0.0;
		this.heightMax = 1.0;

		this.constrainVertical = false;
		this.verticalMin = 0;
		this.verticalMax = Math.PI;

		this.autoSpeedFactor = 0.0;

		this.mouseX = 0;
		this.mouseY = 0;

		this.lat = 0;
		this.lon = 0;
		this.phi = 0;
		this.theta = 0;

		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;
		this.freeze = false;

		this.mouseDragOn = false;

		this.viewHalfX = 0;
		this.viewHalfY = 0;

		if (this.domElement !== document) {

			this.domElement.setAttribute('tabindex', -1);

		}

		this.domElement.addEventListener('contextmenu', function (event) { event.preventDefault(); }, false);

		this.domElement.addEventListener('mousemove', this.bind(this, this.onMouseMove), false);
		this.domElement.addEventListener('mousedown', this.bind(this, this.onMouseDown), false);
		this.domElement.addEventListener('mouseup', this.bind(this, this.onMouseUp), false);
		this.domElement.addEventListener('keydown', this.bind(this, this.onKeyDown), false);
		this.domElement.addEventListener('keyup', this.bind(this, this.onKeyUp), false);

		this.handleResize();

	}

	handleResize() {

		if (this.domElement === document) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	}



	onMouseDown(event) {

		if (this.domElement !== document) {

			this.domElement.focus();

		}

		event.preventDefault();
		event.stopPropagation();

		if (this.activeLook) {

			switch (event.button) {

				case 0: this.moveForward = true; break;
				case 2: this.moveBackward = true; break;

			}

		}

		this.mouseDragOn = true;
	}

	onMouseUp(event) {

		event.preventDefault();
		event.stopPropagation();

		if (this.activeLook) {

			switch (event.button) {

				case 0: this.moveForward = false; break;
				case 2: this.moveBackward = false; break;

			}

		}

		this.mouseDragOn = false;

	}

	onMouseMove(event) {

		var xMouseTmp = event.pageX - this.viewHalfX;
		var yMouseTmp = event.pageY - this.viewHalfY;


		if (!this.domElement === document) {
			xMouseTmp -= this.domElement.offsetLeft;
			yMouseTmp -= this.domElement.offsetTop;
		}

		if (yMouseTmp < 30 && yMouseTmp > -30) {
			yMouseTmp = yMouseTmp * 0.5;
		}

		if (xMouseTmp < 30 && xMouseTmp > -30) {
			xMouseTmp = yMouseTmp * 0.5;
		}


		if (yMouseTmp < 10 && yMouseTmp > -10) {
			yMouseTmp = 0;
		}

		if (xMouseTmp < 10 && xMouseTmp > -10) {
			xMouseTmp = 0;
		}

		this.mouseX = xMouseTmp;
		this.mouseY = yMouseTmp;

	}


	onKeyDown(event) {

		switch (this.keyBoardMapping[event.keyCode]) {

			case this.MOVE_FORWARD: this.moveForward = true; break;

			case this.MOVE_LEFT: this.moveLeft = true; break;

			case this.MOVE_BACKWARD: this.moveBackward = true; break;

			case this.MOVE_RIGHT: this.moveRight = true; break;

			case this.MOVE_UP: this.moveUp = true; break;

			case this.MOVE_DOWN: this.moveDown = true; break;

			case this.FREEZE: this.freeze = !this.freeze; break;

		}

	}


	onKeyUp(event) {

		switch (this.keyBoardMapping[event.keyCode]) {

			case this.MOVE_FORWARD: this.moveForward = false; break;

			case this.MOVE_LEFT: this.moveLeft = false; break;

			case this.MOVE_BACKWARD: this.moveBackward = false; break;

			case this.MOVE_RIGHT: this.moveRight = false; break;

			case this.MOVE_UP: this.moveUp = false; break;

			case this.MOVE_DOWN: this.moveDown = false; break;

		}
	}


	update(delta) {

		if (this.freeze) {

			return;

		}

		if (this.heightSpeed) {

			var y = THREE.Math.clamp(this.object.position.y, this.heightMin, this.heightMax);
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		if (this.moveForward || (this.autoForward && !this.moveBackward)) this.object.translateZ(- (actualMoveSpeed + this.autoSpeedFactor));
		if (this.moveBackward) this.object.translateZ(actualMoveSpeed);

		if (this.moveLeft) this.object.translateX(- actualMoveSpeed);
		if (this.moveRight) this.object.translateX(actualMoveSpeed);

		if (this.moveUp) this.object.translateY(actualMoveSpeed);
		if (this.moveDown) this.object.translateY(- actualMoveSpeed);

		var actualLookSpeed = delta * this.lookSpeed;

		if (!this.activeLook) {

			actualLookSpeed = 0;

		}

		var verticalLookRatio = 1;

		if (this.constrainVertical) {

			verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);

		}

		this.lon += this.mouseX * actualLookSpeed;
		if (this.lookVertical) {
			this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;
		}

		this.lat = Math.max(- 85, Math.min(85, this.lat));
		this.phi = THREE.Math.degToRad(90 - this.lat);

		this.theta = THREE.Math.degToRad(this.lon);

		if (this.constrainVertical) {

			this.phi = THREE.Math.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);

		}

		var targetPosition = this.target,
			position = this.object.position;

		targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
		targetPosition.y = position.y + 100 * Math.cos(this.phi);
		targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);

		this.object.lookAt(targetPosition);

	}

	bind(scope, fn) {

		return function () {

			fn.apply(scope, arguments);

		};

	}


}
