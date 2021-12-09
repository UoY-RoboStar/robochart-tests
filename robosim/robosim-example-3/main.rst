
package Sim

// A 'buffer' operation of sorts.
operation Output(i:nat) {
	 
	input context { }
	output context { event Out:nat }

	initial I
	final F
  
	transition T0 { from I to F action $Out!i }
} 
 
operation IncrementI() {
	
	input context {}
	output context {}
	
	requires ISharedVar
	
	initial I
	final F
	
	transition T0 { from I to F action i=i+1 }
	
}

interface ISharedVar {
	var i:nat = 0
}

interface SimOps {
	Output(i:nat)
	IncrementI()
}

module M {
	
	cycleDef cycle == 1
	
	rref RP=M::RP
	cref C1=CT
	
	connection RP on In to C1 on In ( _async )
	connection C1 on Out to RP on Out ( _async )
}

controller CT {
	
	cycleDef cycle == 1
	
	event In:nat
	event Out:nat
	
	opref outputOp=Output
	opref incrementI=IncrementI
		
	sref STM=STM
	
	connection CT on In to STM on In
	connection STM on Out to CT on Out
}
 
// A state machine with inputs and outputs
stm STM {
	
		// TODO: Revise use of cycleDef with 'cycle' and without.
		cycleDef 1
		var i:nat = 1
	 
		requires SimOps
	
		// Input and Output contexts are mandatory, even if empty.
		input context { event In:nat }
		output context { event Out:nat }
	
		initial I
		state S0 { }
		state S1 { entry IncrementI() ; Output(i) ; exec }
	
		transition T0 { from I to S0 }
		transition T1 { from S0 to S0 exec condition not $In }
		transition T2 { from S0 to S1 condition $In?i } // No Type checking at the moment for usage of SimRefExp.
		transition T3 { from S1 to S0 }
	
	}