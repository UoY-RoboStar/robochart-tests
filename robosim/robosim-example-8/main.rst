
interface DVar {
	var d:nat
}

interface ROp {
	opOut2(x:nat,b:boolean)
}
 
interface ROp3 {
	opOut3(x:nat)
}

interface ROpPlatform {
	opPlatform(y:nat)
}

function id(x:nat):nat {}

// A state machine with no inputs or outputs

operation opOut2(x:nat,b:boolean) {
	requires ROp3
	input context {}
	output context { event Out2:nat event Out3:nat requires ROpPlatform }
	initial I
	junction J
	final F
	transition T0 { from I to J }
	transition T1 { from J to F condition b action opOut3(x+1) }
	transition T2 { from J to F condition not b action $Out2!x }
} 

operation opOut3(x:nat) {
	input context {}
	output context { event Out3:nat requires ROpPlatform }
	initial I
	final F
	transition T0 { from I to F action $Out3!x;$opPlatform(x) }
}



controller CT {
	 
	cycleDef cycle == 1
	 
	uses M::IEvent
	opref opref1=opOut2
	opref opref2=opOut3 
	requires DVar
	requires ROpPlatform
	 
	connection CT on In  to STM on In
	connection STM on Out to CT on Out  
	connection STM on Out2 to CT on Out2
	connection STM on Out3 to CT on Out3 
	 
	stm STM {
	
		cycleDef cycle == 1
		requires ROp
		// Input and Output contexts are mandatory, even if empty.
		input context { event In:nat requires DVar }
		output context { event Out:nat event Out2:nat event Out3:nat requires DVar requires ROpPlatform }
		
		var z : nat
		 
		initial I
		state S0 {}
		
		transition T0 { from I to S0 }
		transition T1 { from S0 to S0 condition $In?z action $d=z;$Out!id($d);z=$d+1;opOut2(z,true);opOut2($d,false);exec }
		transition T2 { from S0 to S0 condition not $In action exec }
	}
}

module Mod {
	
	cycleDef cycle == 1
	cref ctrl0=CT
	
	robotic platform RP {
		uses M::IEvent
		var d:nat
		provides ROpPlatform
	}
	
	connection RP on In to ctrl0 on In ( _async )
	connection ctrl0 on Out to RP on Out ( _async )
	connection ctrl0 on Out2 to RP on Out2 ( _async )
	connection ctrl0 on Out3 to RP on Out3 ( _async )
}