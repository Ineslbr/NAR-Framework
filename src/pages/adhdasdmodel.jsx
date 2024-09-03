import * as React from 'react';
import { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background
} from 'reactflow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
 
import 'reactflow/dist/style.css';
 
const initialNodes = [
   { id: 'asd', position: { x: -200, y: -100 }, data: { label: 'ASD' , description: 'Autism Spectrum Disorder (ASD) is a lifelong neurological disorder and is characterized by deficits in communication and social interactions, as well as restrictive and stereotyped behaviors. '} },
  { id: 'adhd', position: { x: 0, y: 100 }, data: { label: 'ADHD', description: 'ADHD is a neuropsychological disorder and it’s main characteristics are: inattentiveness, impulsivity, and hyperactivity.' } },
  { id: 'taskcomp', position: { x: 250, y: 100 }, data: { label: 'Task Completion', description: 'The ability to understand the meaning behind a text.' } },
  { id: 'learn', position: { x: -100, y: -200 }, data: { label: 'Learning', description: 'The ability to follow instructions and complete a task from beginning to the end.' } },
  { id: 'concentration', position: { x: -400, y: -150 }, data: { label: 'Concentration', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'sensory', position: { x: -250, y: 200 }, data: { label: 'Sensory Issues', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'auditory', position: { x: -450, y: 200 }, data: { label: 'Auditory', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'visual', position: { x: -450, y: 300 }, data: { label: 'Visual', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'interface', position: { x: 600, y: -50 }, data: { label: 'Interface Styling', description: 'High sensitivity in the sensory capacity.' } },
   { id: 'intelem', position: { x: -50, y: -300 }, data: { label: 'Interaction Elements', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'user', position: { x: -250, y: -300 }, data: { label: 'User Guide', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'adaptive', position: { x: -50, y: -300 }, data: { label: 'Adaptive User Interface', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'visualaids', position: { x: -500, y: -300 }, data: { label: 'Visual Aids', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'virtual', position: { x: -400, y: 100 }, data: { label: 'Virtual Reality', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'rewards', position: { x: 450, y: 150 }, data: { label: 'Rewards', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'reminders', position: { x: 400, y: 200 }, data: { label: 'Reminders', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'schedule', position: { x: 300, y: 250 }, data: { label: 'Schedule', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'progress', position: { x: 150, y: 200 }, data: { label: 'Progress Tracker', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'sound', position: { x: -500, y: 0 }, data: { label: 'Sound Control', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'media', position: { x: -200, y: -450 }, data: { label: 'Media Features', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'limited', position: { x: -50, y: -400 }, data: { label: 'Limited Information', description: 'High sensitivity in the sensory capacity.' } },

];
const initialEdges = [
  { id: 'e1-2', source: 'neuro', target: 'asd', data: {label: 'is_extended_by', description: 'Autism is part of the class of Neurodivergent Disorders.' } },
  { id: 'e1-3', source: 'neuro', target: 'adhd' , data: {label: 'is_extended_by', description: 'ADHD is part of the class of Neurodivergent Disorders.' }},
  { id: 'e1-4', source: 'neuro', target: 'dyslexia' , data: {label: 'is_extended_by', description: 'Dyslexia is part of the class of Neurodivergent Disorders.'}},
  { id: 'e4-5', source: 'dyslexia', target: 'taskcomp' , data: {label: 'has_issue_with', description: 'People with dyslexia have a working memory deficit, which means that concentration on writing quality may be detrimental to understanding.'}},
  { id: 'e3-6', source: 'dyslexia', target: 'learn' , data: {label: 'has_issue_with', description: 'Lack of focus, inability to sit still for long periods of time, forgetfulness, impulsivity, time management difficulties and disorganization are some of the characteristics of ADHD.'}},
  { id: 'e2-6', source: 'dyslexia', target: 'concentration' , data: {label: 'has_issue_with', description: 'Many of the symptoms of Autism originate with impairments in the Executive Functions, such as in working memory, cognitive, flexibility, planning, generativity, self-monitoring and inhibition.'}},
  { id: 'e2-7', source: 'dyslexia', target: 'navigation' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-8', source: 'dyslexia', target: 'writing' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-9', source: 'dyslexia', target: 'reading' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-10', source: 'dyslexia', target: 'scan' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-11', source: 'asd', target: 'sensory' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-12', source: 'sensory', target: 'auditory' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-13', source: 'sensory', target: 'visual' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-14', source: 'reading', target: 'interface' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-15', source: 'reading', target: 'readaid' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-16', source: 'writing', target: 'autocomp' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-17', source: 'writing', target: 'spell' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-18', source: 'navigation', target: 'org' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-19', source: 'navigation', target: 'intelem' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-20', source: 'learn', target: 'user' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-21', source: 'concentration', target: 'visualaids' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-22', source: 'concentration', target: 'virtual' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-23', source: 'concentration', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-24', source: 'taskcomp', target: 'rewards' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-25', source: 'taskcomp', target: 'reminders' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-26', source: 'taskcomp', target: 'schedule' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-27', source: 'taskcomp', target: 'progress' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-28', source: 'taskcomp', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-29', source: 'scan', target: 'visualaids' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-30', source: 'auditory', target: 'sound' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-31', source: 'auditory', target: 'media' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-32', source: 'visual', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-33', source: 'intelem', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-34', source: 'limited', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-35', source: 'interface', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-36', source: 'media', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-37', source: 'asd', target: 'learn' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-38', source: 'asd', target: 'concentration' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-39', source: 'asd', target: 'taskcomp' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-40', source: 'adhd', target: 'taskcomp' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-41', source: 'adhd', target: 'concentration' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-42', source: 'adhd', target: 'learn' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},


];


 
export default function ADHDASD() {
  const onNodeClick = (event, node) => {
    setSelectedType('Concept');
    setSelectedLabel(node.data.label);
    setSelectedDescription(node.data.description);
    setOpen(true);
    console.log('click node', node.data.label)
  };

  const onEdgeClick = (event, edge) => {
    setSelectedType('Relation');
    setSelectedLabel(edge.data.label);
    setSelectedDescription(edge.data.description);
    setOpen(true);
    console.log('click edge', edge.data.label)
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [selectedLabel, setSelectedLabel] = React.useState(initialNodes[1].data.label);
  const [selectedDescription, setSelectedDescription] = React.useState(initialNodes[1].data.description);
  const [selectedType, setSelectedType] = React.useState('Concept');

  return (
    <>
    <div style={{ width: '100vw', height: '100vh' ,backgroundColor: '#FFFFFF'}} >
      <b>
        <a href="/selector">Go Back</a>
      </b>
      <ReactFlow 
        nodes={initialNodes} 
        edges={initialEdges} 
        onNodeClick={onNodeClick} 
        onEdgeClick={onEdgeClick}
        fitView
        >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          color: 'black'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedType}: {selectedLabel}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedDescription}
          </Typography>
        </Box>
      </Modal>
    </div>
    </>
  );
}