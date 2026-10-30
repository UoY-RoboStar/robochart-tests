interface IEvents {
	event e1 : nat
	event e2 : nat
	event e3 : nat
	event e4 : nat
} 
 
controller ctrl0 {
	uses IEvents sref stm_ref0 = stm0
	sref stm_ref1 = stm0
	sref stm_ref2 = stm0
	sref stm_ref3 = stm0
	connection ctrl0 on e1 to stm_ref0 on e1
	connection stm_ref0 on e2 to stm_ref1 on e1
	connection stm_ref1 on e2 to ctrl0 on e2
	connection ctrl0 on e3 to stm_ref2 on e1
	connection stm_ref3 on e2 to ctrl0 on e4
	connection stm_ref2 on e2 to stm_ref3 on e1
	cycleDef cycle == 1
}

stm stm0 {
	var x : nat
	input context { event e1 : nat }
	output context { event e2 : nat }
	cycleDef cycle == 1
	initial i0
	state Idle {
	}
	transition t0 {
		from i0
		to Idle
	}
	transition t1 {
		from Idle
		to Idle
		condition not $ e1
		action exec
	}
	transition t2 {
		from Idle
		to Idle
		condition $ e1 ? x
		action $ e2 ! x ; exec
	}
}

module mod0 {
	connection Robot on e1 to ctrl_ref0 on e1 ( _async )
	connection Robot on e2 to ctrl_ref0 on e3 ( _async )
	connection ctrl_ref0 on e4 to ctrl_ref1 on e1
	connection ctrl_ref0 on e2 to ctrl_ref1 on e3
	connection ctrl_ref1 on e2 to Robot on e3 ( _async )
	connection ctrl_ref1 on e4 to Robot on e4 ( _async )
	robotic platform Robot {
		uses IEvents }

	cref ctrl_ref0 = ctrl0
	cref ctrl_ref1 = ctrl0
	cycleDef cycle == 1
}
