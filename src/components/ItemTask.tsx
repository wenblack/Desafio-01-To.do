import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    TextInput,
    FlatListProps,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { Task } from './TasksList';
import { Props } from '../pages/Home';


interface TasksProps {
    tasks: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ id, title }: Props) => void;
}


export function ItemTask({
    tasks,
    toggleTaskDone,
    removeTask,
    editTask,
}: TasksProps) {
    //Estado para confirmar se o botão de Editar foi Clicado
    const [naoAtivo, ativo] = useState(false);
    //Estado resposavel por pegar e modificar o título
    const [getTitulo, setTitulo] = useState(tasks.title);
    //Utilizado useRef para fazer referencia ao estado e transforma em Input 
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        ativo(true);

    }

    function handleCancelEditing() {
        setTitulo(tasks.title);
        ativo(false);
    }

    function handleSubmitEditing() {
        editTask({ id: tasks.id, title: tasks.title })
        ativo(false);

    }

    useEffect(() => {
        if (textInputRef.current) {
            if (naoAtivo) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [naoAtivo])


    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(tasks.id)}
                >
                    <View
                        style={tasks.done ? styles.taskMarkerDone : styles.taskMarker}

                    >
                        {tasks.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        value={getTitulo}
                        onChangeText={setTitulo}
                        //Propriedade que permite dizer quando um input fica editavel
                        editable={naoAtivo}
                        onSubmitEditing={handleSubmitEditing}
                        style={tasks.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />

                </TouchableOpacity>
            </View>

            <View
                style={styles.iconsContainer}
            >
                {naoAtivo ? (

                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2"

                        />
                    </TouchableOpacity>) : (


                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <Text
                    style={{
                        paddingVertical: 12,
                        paddingHorizontal: 12,
                        alignItems: 'center',
                        fontSize: 24,
                        color: '#B2B2B2',
                        opacity: 0.4
                    }}
                >I</Text>

                <View
                />

                <TouchableOpacity
                    disabled={naoAtivo}
                    onPress={() => removeTask(tasks.id)}
                >

                    <Image source={trashIcon}
                        style={{ opacity: naoAtivo ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
        alignItems: 'center'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium',
        alignItems: 'center'
    },
    iconsContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: 'center'
    },
})