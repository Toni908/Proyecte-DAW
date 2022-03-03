import {Component} from "react";
import Select from 'react-select'
import schedule from "./utilities/schedule";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class SelectHorario extends Component {

    constructor() {
        super();

        this.state = {
            selectedOption: null,
        }
    }

    handleChange = (selectedOption) => {
        let { time } = this.props;

        this.setState({ selectedOption }, () =>
            time = this.state.selectedOption.label
        );

        console.log(time)
    };

    render() {
        const { selectedOption } = this.state;

        return(
            <Select options={getHorarioFromDate(this.props.date,this.props.horario)} value={selectedOption} onChange={this.handleChange}/>
        )
    }
}

export default SelectHorario

function getHorarioFromDate(date, horario) {
    let arrayHorario = [];
    if (!Array.isArray(horario)) {
        horario = Object.values(horario)
    }

    for (let i = 0; i < horario.length; i++) {
        let number = schedule.getDayNumber(horario[i].day);
        if (number===date.getDay()) {
            let hora_fin = parseInt(horario[i].hora_fin.split(":")[0]);
            let hora_inicio = parseInt(horario[i].hora_inicio.split(":")[0]);
            for (let x = hora_inicio; x < hora_fin; x++) {
                arrayHorario.push({ value: x+':00:00', label: x+':00' });
            }
        }
    }
    return arrayHorario;
}