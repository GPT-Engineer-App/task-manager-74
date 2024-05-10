import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        description: "Please enter a task before adding.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex direction="column" gap={4}>
        <Heading size="lg">Todo App</Heading>
        <Flex as="nav">
          <Button mr={2} onClick={() => {}}>Home</Button>
          <Button onClick={() => {}}>About</Button>
        </Flex>
        <Flex mt={4}>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button ml={2} onClick={handleAddTask}>Add</Button>
        </Flex>
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
              <Flex>
                <IconButton icon={<FaCheckCircle />} onClick={() => handleToggleCompletion(task.id)} colorScheme={task.isCompleted ? 'green' : 'gray'} aria-label="Complete Task" />
                <IconButton icon={<FaTrash />} ml={2} onClick={() => handleDeleteTask(task.id)} colorScheme="red" aria-label="Delete Task" />
              </Flex>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Container>
  );
};

export default Index;