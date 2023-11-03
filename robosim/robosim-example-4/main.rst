

// A state machine with no inputs or outputs

stm STM {
	
	cycleDef cycle == 1
	
	// Input and Output contexts are mandatory, even if empty.
	input context { event In:nat }
	output context { event Out:nat }
	
	var d:nat
	 
	initial I
	state S0 {}
	
	transition T0 { from I to S0 }
	transition T1 { from S0 to S0 condition $In?d action $Out!d;exec }
	transition T2 { from S0 to S0 condition not $In action exec }
}

controller CT {
	
	cycleDef cycle == 1
	
	uses M::IEvent
	sref stm0=STM
	
	connection CT on In to stm0 on In
	connection stm0 on Out to CT on Out
	
}

module Mod {
	
	cycleDef cycle == 1
	cref ctrl0=CT
	
	robotic platform RP {
		uses M::IEvent
	}
	
	connection RP on In to ctrl0 on In ( _async )
	connection ctrl0 on Out to RP on Out ( _async )
}