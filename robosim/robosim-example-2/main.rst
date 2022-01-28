
package Sim
// A state machine with no inputs or outputs

stm STM {
	
	// TODO: Revise use of cycleDef with 'cycle' and without.
	cycleDef cycle == 1
	
	// Input and Output contexts are mandatory, even if empty.
	input context { event In } 
	output context { event Out }
	
	initial I
	state S0 {}
	
	transition T0 { from I to S0 }
	transition T1 { from S0 to S0 exec  }
}