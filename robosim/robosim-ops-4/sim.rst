package Sim
diagram main 

interface IOpA {
	opA ( d : nat )
}

operation opA ( d : nat
) {
	requires IOpB 
	var e : nat = 2
	input context {}
	output context { requires IRop }
	initial i0
	final f0
	transition t0 {
		from i0
		to f0
		action opB ( d )
	}
clock C
}

operation opB ( d : nat
) {
	input context {}
	output context { requires IRop }
	requires IVars initial i0
	final f0
	transition t0 {
		from i0
		to f0
		action $opC ( e + d )
	}
}

operation opD ( d : nat
) {
	input context {}
	output context {}
}

interface IOpB {
	opB ( d : nat )
}

interface IVars {
	var e : nat
	clock C
}

interface IEvents {
	event inputx : nat
}

interface IRop {
	opC ( d : nat )
}

robotic platform RP {
	uses IEvents provides IRop }

controller ctrl0 {
	cycleDef { cycle == 1 }
	uses IEvents 
	requires IRop 
	opref op_ref0 = opA
	opref op_ref1 = opB
	opref op_ref2 = opD
	sref stm_ref0 = stm0
	connection ctrl0 on inputx to stm_ref0 on inputx
}

stm stm0 {
	cycleDef { cycle == 1}
	input context { uses IEvents}
	output context { requires IRop }
	requires IOpA 
	var r : nat
	
	initial i0
	final f0
	state s0 {
	}
	transition t0 {
		from s0
		to f0
		condition $inputx?r
		action opA ( r )
	}
	transition t1 {
		from i0
		to s0
	}
	transition t2 {
		from s0
		to s0
		condition not $inputx
		action exec
	}
}

module mod0 {
	cycleDef { cycle == 1 }
	connection rp_ref0 on inputx to ctrl_ref0 on inputx ( _async )
	rref rp_ref0 = RP
	cref ctrl_ref0 = ctrl0
}

