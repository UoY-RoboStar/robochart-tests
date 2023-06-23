
import DT::*

interface DVar {
	var d:nat
}
 
controller CT {
	 
	cycleDef cycle == 1
	 
	uses M::IEvent
	 
	connection CT on In  to STM on In
	connection STM on Out to CT on Out  
	 
	stm STM {
	
		cycleDef cycle == 1
		// Input and Output contexts are mandatory, even if empty.
		input context { event In:nat requires DVar }
		output context { event Out:nat requires DVar }
		
		var z : nat
		 
		initial I
		state S0 {}
		
		transition T0 { from I to S0 }
		transition T1 { from S0 to S0 condition $In?z action $Out!id($d,xp::null,id2(xp2::null));exec }
		transition T2 { from S0 to S0 condition not $In action exec }
	}
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