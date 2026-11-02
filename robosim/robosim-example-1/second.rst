

// A state machine with no inputs or outputs

stm STM {
	
	cycleDef cycle == 1
	
	// Input and Output contexts are mandatory, even if empty.
	input context { }
	output context { }  
	 
	initial I
	state S0 {}
	 
	transition T0 { from I to S0 } 
	transition T1 { from S0 to S0 exec  }
}

controller CT {
	
	cycleDef cycle == 1
	
	sref stm0=STM
	
}

module Mod {
	
	cycleDef cycle == 1
	cref ctrl0=CT 
	
	robotic platform RP {
		
	}
}