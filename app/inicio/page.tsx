"use client"
import { Box, Text, HStack, VStack, Input, Card, Center } from "@chakra-ui/react";
import { DeleteIcon, AddIcon, EditIcon } from "@chakra-ui/icons";
import { FooterMenu } from "@/components/Footer";
import { useState } from "react";
import CardLista from "@/components/CardLista";
import { ITarefa } from '@/components/CardLista';

const { v4: uuidv4 } = require('uuid');
const cor = "#0B1C5A"
const corLista = "#CBE1ED"

interface ILista {
    idTopico: string
    title: string
    color: string
    idLista: string
}

const topicosData = [
    { 
        id: "4e7afed7-6d8d-4710-ba40-c878e4172800",
        title: "Tópico 1",
        color: cor
    },
    {
        id: "2dd7689c-77f2-43cf-9d4f-b42246bf6fe1",
        title: "Tópico 2",
        color: cor
    },

]

const listasData = [
    {
        idTopico: "4e7afed7-6d8d-4710-ba40-c878e4172800",
        title: "Lista 1",
        color: corLista,
        idLista: "4e7afed7-6d8d-4710-ba40-c878231233123"
    },
    {
        idTopico: "2dd7689c-77f2-43cf-9d4f-b42246bf6fe1",
        title: "Lista 2",
        color: corLista,
        idLista: "4e7afed7-6d8d-47asd10-ba40-c878231233123"
    },
    {
        idTopico: "4e7afed7-6d8d-4710-ba40-c878e4172800",
        title: "Lista 2",
        color: corLista,
        idLista: "e032564d-3ebb-4fa0-b4c5-bb566fd4f2d8"
    }
]



export default function Inicio() {

    const [topicos, setTopicos] = useState(topicosData)
    const [tarefas, setTarefas] = useState<ITarefa[]>([])
    const [editando, setEditando] = useState(false)
    const [editandoId, setEditandoId] = useState("")
    const [listas, setListas] = useState(listasData)
    const [listaParaComponente, setListaParaComponente] = useState(listasData)


    function handleFindListas(id: string) {
        const newListas = listas.filter((item) => item.idTopico === id)
        setListaParaComponente(newListas)
    }


    function handleDelete(id: string) {
        const newTopicos = topicos.filter((item) => item.id !== id)
        setTopicos(newTopicos)
    }
    

    function handleAdd(title: string)  {
        const newIdTopico = uuidv4();
        const newIdLista = uuidv4();

        const newLista = {
            idTopico: newIdTopico,
            title: "Nova Lista",
            color: corLista,
            idLista: uuidv4(),
            tarefas: [
                {
                  idTask: uuidv4(),
                  title: "Nova Tarefa",
                  concluido: false,
                },
              ],
        };

        const newTarefas = [
            ...tarefas,
            {
                idTask: uuidv4(),
                idLista: newIdLista,
                title: "Nova Tarefa",
                concluido: false,
            },
        ];

        const newTopicos = [
            ...topicos,
            {
                id: newIdTopico,
                title: title,
                color: cor,
            },
        ];

        const newListas = [...listas, newLista];

        setTopicos(newTopicos);
        setListas(newListas);
        setListaParaComponente(newListas);
        setTarefas(newTarefas);

    }

    function handleAddTarefa(idLista: string): void {
        const newTarefa: ITarefa = {
            idTask: String(Date.now()),
            idLista: idLista,
            title: "Nova Tarefa",
            concluido: false,
        };

        const newTarefas = [...tarefas, newTarefa];
        setTarefas(newTarefas);
    }

    const handleEdit = (id: string, newTitle: string) => {
        setEditando(true);
        setEditandoId(id);
        const newTopicos = topicos.map((item) => {
            if (item.id === id) {
                return { ...item, title: newTitle };
            }
            return item;
        });
        const newTarefas = tarefas.map((item) => {
            if (item.idTask === id) {
                return { ...item, title: newTitle };
            }
            return item;
        });

        setTopicos(newTopicos);
        setTarefas(newTarefas);
    };
    const addNewList = () => {
        const newLista: ILista = {
            idTopico: '',
            title: "Nova Lista",
            color: corLista,
            idLista: uuidv4(),
        };
        
    }

    return (
        <Box p="3" color='white'>
            <HStack >
                <VStack h="53.25rem" w="20.62rem" bg={"#F4F4F4"} rounded={"md"} justifyContent={"space-between"}>
                    <VStack p="3" w="full" justifyContent={"space-between"} alignItems={"flex-start"}>
                        <Text fontWeight={"bold"} color={'#444444'}>
                            Menu
                        </Text>

                        <VStack mt="7" w="full" alignItems={"flex-start"}>

                            <HStack w="full" justifyContent={"space-between"}>
                                <Text fontWeight={"bold"} fontSize={"md"} color={'#444444'} >
                                    Tópicos
                                </Text>
                                <AddIcon color={"#444444"} cursor="pointer" onClick={() => handleAdd("Novo Tópico")} />
                            </HStack>

                            <VStack w="full"
                                overflowY={"auto"}
                                maxH={"40rem"}
                                overflowX={"hidden"}

                            >
                                {
                                    topicos.map((item) => (
                                        <HStack key={item.id} w="full" p="1" ml="1" rounded={"md"} justifyContent={"space-between"}>
                                            <HStack>
                                                <Box w="1rem" h="1rem" bg={
                                                    item.color
                                                } rounded={"md"} />
                                                {
                                                    editando && editandoId === item.id ? (
                                                        <Input
                                                            w="full"
                                                            variant="unstyled"
                                                            textColor={"red"}
                                                            defaultValue={item.title}
                                                            onBlur={(e) => {
                                                                handleEdit(item.id, e.target.value);
                                                                setEditando(false);
                                                            }}
                                                        />
                                                    ) : (
                                                        topicos.length > 0 ? (
                                                            <Text onClick={() => handleFindListas(item.id)} fontSize={"md"} color={'#444444'}>
                                                                {item.title}
                                                            </Text>
                                                        ) : null
                                                    )}
                                            </HStack>
                                            <HStack>
                                                <EditIcon color={"#444444"} cursor="pointer" onClick={() => { handleEdit(item.id, item.title) }} />
                                                <DeleteIcon color={"#444444"} cursor="pointer" onClick={
                                                    () => handleDelete(item.id)
                                                } />
                                            </HStack>
                                        </HStack>

                                    ))
                                }



                            </VStack>

                        </VStack>

                    </VStack>
                    <FooterMenu />
                </VStack>

                <VStack h="53.25rem" w="65.938rem" bg={"#C5CCD9"} rounded={"md"}>
                    <Box p="3">
                        <Text color={'#0B1C5A'} fontWeight={"bold"} alignSelf={"center"}>TASK PLANNER</Text>
                    </Box>
                    <HStack w="full" h="full" p="3" alignItems={"flex-start"}>
                    {listaParaComponente.map((item) => (
              <VStack key={item.idTopico} w="full" h="full" p="3">
                <Text fontWeight="bold" color="#444444">
                  Tópico: {item.idTopico}
                </Text>
                <VStack w="full" overflowY="auto" maxH="40rem" overflowX="hidden">
                  {item.listas.map(() => (
                    <CardLista
                      key={lista.idLista}
                      listas={listaParaComponente}
                      tarefas={tarefas}
                      handleAddTarefa={handleAddTarefa}
                    />
                  ))}
                </VStack>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}

