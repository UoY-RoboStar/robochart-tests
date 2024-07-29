package Sim

module M {
	cycleDef cycle == 1
	rref rp = RP
	cref cr = C1
	connection rp on inp to cr on inp (_async)
}         
 
controller C1 {
	cycleDef cycle == 1
	
	uses IEvents
	requires IReqVars
	requires IDefVars
	sref stm_ref1 = STM1
	sref stm_ref2 = STM2
	
	connection C1 on inp to stm_ref1 on inp
	connection stm_ref1 on inter to stm_ref2 on inter
}

stm STM1 {
	cycleDef cycle == 1
	
	input context {
		event inp:int
		requires IDefVars
	}
	
	output context {
		event inter
		requires IDefVars
	}
	
	var x : int
	
	initial I
	final F
	state S0 {
		
	}
	transition T0 { from I to S0 }
	transition T1 { from S0 to F condition $inp?x action $local=x;$inter;exec }
	transition T2 { from S0 to S0 condition (not $inp) action exec }
}     
 
stm STM2 {
	cycleDef cycle == 1
	
	input context {
		event inter
		requires IDefVars
		requires IReqVars
	}
	
	output context {
		requires IDefVars
		requires IReqVars
	}
	
	initial I
	final F
	
	state S0 {
		
	}
	
	transition T0 { from I to S0 }
	transition T1 { from S0 to F condition $inter action $reqx=$local }
	transition T2 { from S0 to S0 condition (not $inter) action exec }
}