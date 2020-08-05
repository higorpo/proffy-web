import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
    const history = useHistory();

    const [scheduleItems, setScheduleItems] = useState([
        {
            week_day: '',
            from: '',
            to: ''
        }
    ]);

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    function addNewScheduleItem() {
        setScheduleItems(items => [...items, {
            week_day: '',
            from: '',
            to: ''
        }])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index == position) {
                return {
                    ...scheduleItem,
                    [field]: value
                }
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert("Cadastro realizado com sucesso!")
            history.push('/');
        }).catch(() => {
            alert("Erro no cadastro!");
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição!"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                            name="name"
                            label="Nome completo"
                        />
                        <Input
                            value={avatar}
                            onChange={(ev) => setAvatar(ev.target.value)}
                            name="avatar"
                            label="Avatar"
                        />
                        <Input
                            value={whatsapp}
                            onChange={(ev) => setWhatsapp(ev.target.value)}
                            name="whatsapp"
                            label="Whatsapp"
                            type="tel"
                        />
                        <Textarea
                            value={bio}
                            onChange={(ev) => setBio(ev.target.value)}
                            name="bio"
                            label="Biografia"
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                {
                                    value: "Artes",
                                    label: "Artes"
                                },
                                {
                                    value: "Biologia",
                                    label: "Biologia"
                                },
                                {
                                    value: "Ciências",
                                    label: "Ciências"
                                },
                                {
                                    value: "Educação Física",
                                    label: "Educação Física"
                                },
                                {
                                    value: "Física",
                                    label: "Física"
                                },
                                {
                                    value: "Geografia",
                                    label: "Geografia"
                                },
                                {
                                    value: "História",
                                    label: "História"
                                },
                                {
                                    value: "Matemática",
                                    label: "Matemática"
                                },
                                {
                                    value: "Português",
                                    label: "Português"
                                },
                                {
                                    value: "Química",
                                    label: "Química"
                                }
                            ]}
                        />
                        <Input
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            name="cost"
                            label="Custo da sua hora por aula"
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button onClick={addNewScheduleItem} type="button">
                                + Novo horário
                        </button>
                        </legend>

                        {
                            scheduleItems.map((scheduleItem, index) => (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week-day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            {
                                                value: "1",
                                                label: "Segunda-feira"
                                            },
                                            {
                                                value: "2",
                                                label: "Terça-feira"
                                            },
                                            {
                                                value: "3",
                                                label: "Quarta-feira"
                                            },
                                            {
                                                value: "4",
                                                label: "Quinta-feira"
                                            },
                                            {
                                                value: "5",
                                                label: "Sexta-feira"
                                            },
                                            {
                                                value: "6",
                                                label: "Sábado"
                                            },
                                            {
                                                value: "0",
                                                label: "Domingo"
                                            }
                                        ]}
                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            ))
                        }
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;