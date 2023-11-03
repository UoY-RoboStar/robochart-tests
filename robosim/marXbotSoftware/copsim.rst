package Simulation interface MovementI {
	move ( lv : real , av : real )
	stop()
}

interface ObstacleI {
	event obstacle
}

controller Movement {
	cycleDef cycle == 1
uses ObstacleI requires MovementI sref stm_ref0 = SMMovement
connection Movement on obstacle to stm_ref0 on obstacle
}

stm SMMovement {
	const PI : real , lvel : real , avel : real
	clock turnTimer
	input context { uses ObstacleI }
	output context { requires MovementI }
	cycleDef cycle == 1
initial i0
	state SMoving { entry $move(lvel,0)
	}
	state DMoving {
	}
	junction j0
	state Waiting {
	}
	state STurning { entry $move(0,avel)
	
	}
	state DTurning {
	}
	junction j1
	transition t0 {
		from i0
		to SMoving
	}
transition t1 {
		from SMoving
		to DMoving
	}
	transition t2 {
		from DMoving
		to j0
		exec
	}
	transition t3 {
		from j0
		to DMoving
		condition not $obstacle
	}
transition t4 {
		from j0
		to Waiting
		condition $obstacle
		action #turnTimer; $stop()
	}
transition t5 {
		from Waiting
		to STurning
		exec
	}
transition t6 {
		from STurning
		to DTurning
	}
	transition t7 {
		from DTurning
		to j1
		exec
	}
transition t8 {
		from j1
		to DTurning
		condition since(turnTimer)< PI/avel
	}
transition t9 {
		from j1
		to SMoving
		condition since(turnTimer)>=PI/avel
	}
}

module marXbotSoftware {
	robotic platform marXbotServices {
		uses ObstacleI provides MovementI }

	cycleDef cycle == 1
connection marXbotServices on obstacle to ctrl_ref0 on obstacle ( _async )
	cref ctrl_ref0 = Movement
}

