package Sim

module CFootBot {
	
	cycleDef (cycle == 1)
	
	robotic platform FootBot {
		provides MovementI
		uses ObstacleI
	}
	cref ctrl_ref0 = Movement 
	connection FootBot on obstacle to ctrl_ref0 on obstacle
( _async )
}

controller Movement {
	
	cycleDef (cycle == 1)
	
	requires MovementI
	uses ObstacleI
	stm SMovement {
	
	cycleDef (cycle == 1)
	
	input context {
		uses ObstacleI
	}
	output context {
		requires MovementI
	}
	
	const lv : real
	const PI: real 
	const av : real = 1
	
	clock MBC
	initial i1
	
	state Moving {
		entry $move( lv , 0) ; exec
	}
	state DMoving {
		
	}
	state Turning {
		entry $move( 0 , av)
	}
	state DTurning {
		
	}
	transition t1 {
		from i1
		to Moving
	}
	transition t2 {
		from DMoving
		to Turning
		condition $obstacle action #MBC 
	}
	transition t3 {
		from DTurning
		to Moving
		condition since ( MBC ) >= PI / av
	}
	transition t4 {
		from DMoving
		to DMoving
		exec
		condition not $obstacle
	}
	transition t5 {
		from DTurning
		to DTurning
		exec
		condition since ( MBC ) < PI / av
	}
	transition t6 {
		from Moving
		to DMoving
	}
	transition t7 {
		from Turning
		to DTurning
	}
}
	
	connection Movement on obstacle to SMovement on obstacle

}

