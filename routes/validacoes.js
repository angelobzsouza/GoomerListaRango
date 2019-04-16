// Verifica se o dia é válido, caso sim retorna um inteiro que representa o dia, caso não retorna falso
validaDias = function (horarios_funcionamento) {
	// Se não houver nenhum horário
	if (horarios_funcionamento.length === 0) {
		return false;
	}

	var validou = true;
	// Vetor para verificar se não há intersecção
	var diasDaSemana = [0, 0, 0, 0, 0, 0, 0];

	horarios_funcionamento.forEach((horario) => {
		// Confere se é um dia válido
		var primeiroDia = day2Int(horario.primeiroDia);
		var ultimoDia = day2Int(horario.ultimoDia);

		if (primeiroDia === false || ultimoDia === false) {
			console.log("Entrou");
			validou = false;
			return;
		}

		// Confere se não há interseção
		for (i = primeiroDia; i <= ultimoDia; i++) {
			if (diasDaSemana[i] === 1) {
				validou = false;
				return;
			}
			else {
				diasDaSemana[i] = 1;
			}
		}
	});
	// Caso esteja tudo certo, retorna true
	return validou;
}

// Valida o horario, caso esteja correto retorna um inteiro, se não, falso
validaHorarios = function (horarios_funcionamento) {
	// Se não houver nenhum horário
	if (horarios_funcionamento.length === 0) {
		return false;
	}

	var validou = true;

	horarios_funcionamento.forEach((horario) => {
		var horaInicio = parseInt(horario.horarioInicio.replace(":", ""));
		var horaFim = parseInt(horario.horarioFim.replace(":", ""));
		var minutosInicio = horaInicio%100;
		var minutosFim = horaFim%100;


		// O horario deve existir, ou seja, considerando intervalos de 15 minutos, os minutos não podesem ser maiores que 45
		if (minutosInicio > 45 || minutosFim > 45) {
			validou = false;
			return;
		}

		// Horario deve estar entre 0000 e 2345
		if (horaInicio > 2345 || horaInicio < 0 || horaFim > 2345 || horaFim < 0) {
			validou = false;
			return;
		}

		// Inicio deve ser menor que o fim
		if (horaInicio > horaFim) {
			validou = false;
			return;
		}

		// Horario deve estar em intervalos de 15 minutos
		if (minutosInicio % 15 !== 0 || minutosFim % 15 !== 0) {
			validou = false;
			return
		}
	});
	return validou;
}

day2Int = function (day) {
	switch (day) {
		case "Seg":
			return 0;
		break;
		case "Ter":
			return 1;
		break;
		case "Qua":
			return 2;
		break;
		case "Qui":
			return 3;
		break;
		case "Sex":
			return 4;
		break;
		case "Sab":
			return 5;
		break;
		case "Dom":
			return 6;
		break;
		default:
			return false;
	}	
}

const funcoes = {
	validaDias: validaDias,
	validaHorarios: validaHorarios
}

module.exports = funcoes;