

// A state machine with no inputs or outputs

stm STM {
	
	cycleDef cycle == 1
	
	// Input and Output contexts are mandatory, even if empty.
	input context { event In:nat requires M::IVars }
	output context { event Out1:nat event Out2:nat requires M::IVars requires M::IOps }
	
	var d:nat
	 
	initial I
	final F
	state S0 {}
	
	transition T0 { from I to S0 }
	transition T1 { from S0 to F action $Out1!$x;$Out2!$x }
}

controller CT {
	
	cycleDef cycle == 1
	
	requires M::IVars
	requires M::IOps
	uses M::IEvent
	sref stm0=STM
	
	connection CT on In to stm0 on In
	connection stm0 on Out1 to CT on Out1
	connection stm0 on Out2 to CT on Out2
}

module Mod {
	
	cycleDef cycle == 1
	cref ctrl0=CT
	
	robotic platform RP {
		uses M::IEvent
		provides M::IVars
		provides M::IOps
	}
	
	connection RP on In to ctrl0 on In ( _async )
	connection ctrl0 on Out1 to RP on Out1 ( _async )
	connection ctrl0 on Out2 to RP on Out2 ( _async )
}