import React, { useState, FormEvent } from 'react';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function handleSearchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day: weekDay,
                time
            }
        })

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={handleSearchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
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
                    <Select
                        name="week-day"
                        label="Dia da semana"
                        value={weekDay}
                        onChange={e => setWeekDay(e.target.value)}
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
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        name="time"
                        label="Hora"
                        type="time"
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) =>
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                        />
                    )
                }
            </main>
        </div>
    );
}

export default TeacherList;