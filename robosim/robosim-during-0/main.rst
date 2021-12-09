
package Sim
// A state machine with no inputs or outputs

interface IEvent {
	event out
}
interface IOp {
	op() 
}
 
controller CT {
	 
	cycleDef cycle == 1
	uses IEvent
	
	sref stm0=STM
	opref op=op
	connection stm0 on out to CT on out
	
}

stm STM {
	
	cycleDef cycle == 1
	requires IOp

	input context { }
	output context { uses IEvent }
	
	initial I
	state S0 {
		during op ( )  }
	
	transition T0 { from I to S0 }
	transition T1 { from S0 to S0
		exec
	}
}

operation op() {
	
	initial I
	state S0 {}
	transition T0 { from I to S0 action $out;exec }
	
input context {}
	output context { event out }
}

module Mod {
	
	cycleDef cycle == 1
	cref ctrl0=CT
	
	robotic platform RP {
		uses IEvent
	}
	
	connection ctrl0 on out to RP on out ( _async )
}

