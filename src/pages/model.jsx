import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background
} from 'reactflow';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import 'reactflow/dist/style.css';
import { useLocation } from 'react-router-dom';


 
const initialNodes = [
  { id: 'neuro', position: { x: 0, y: 0 }, data: { label: 'Neurodivergent Condition', description: 'Neurodiversity is the diversity of human brains and minds. Neurodivergent, refers to individuals whose brain functions differ significantly from societal norms of "normal." This can be due to genetic factors, experiences altering brain function, or a combination of both. Examples include autism and dyslexia.' } },
  { id: 'asd', position: { x: -200, y: -100 }, data: { label: 'ASD' , description: 'Autism Spectrum Disorder (ASD) is a lifelong neurological disorder and is characterized by deficits in communication and social interactions, as well as restrictive and stereotyped behaviors. There are three classes of autism: high, medium, and low functioning, with low functioning autism being the most severe with serious communication problems and low cognitive function '} },
    { id: 'adhd', position: { x: 0, y: 100 }, data: { label: 'ADHD', description: 'ADHD (Attention-Deficit/Hyperactivity Disorder) is a neurodevelopmental disorder usually detected in childhood and persists into adulthood. Common symptoms include lack of focus, restlessness, forgetfulness, impulsivity, time management issues, disorganization, and emotional dysregulation ' } },
    { id: 'dyslexia', position: { x: 200, y: -100 }, data: { label: 'Dyslexia', description: 'Dyslexia is a specific learning disability which is neurological in origin. It is characterized by difficulties with accurate and/or fluent word recognition and by poor spelling and decoding abilities. These difficulties often result from a deficit in the phonological component of language, leading to secondary consequences such as problems in reading comprehension. Research broadly agrees on the distinction of three types of dyslexia: phonological, surface, and deep dyslexia' } },
    { id: 'taskcomp', position: { x: 250, y: 100 }, data: { label: 'Task Completion', description: '' } },
    { id: 'learn', position: { x: -100, y: -200 }, data: { label: 'Learning', description: '' } },
    { id: 'concentration', position: { x: -400, y: -150 }, data: { label: 'Concentration', description: '' } },
    { id: 'navigation', position: { x: 200, y: -200 }, data: { label: 'Navigation', description: '' } },
    { id: 'writing', position: { x: 400, y: -200 }, data: { label: 'Writing', description: '' } },
    { id: 'reading', position: { x: 400, y: -100 }, data: { label: 'Reading', description: '' } },
    { id: 'scan', position: { x: 450, y: 0 }, data: { label: 'Scanning for Information', description: '' } },
    { id: 'sensory', position: { x: -250, y: 200 }, data: { label: 'Sensory Issues', description: 'High sensitivity in the sensory capacity.' } },
    { id: 'auditory', position: { x: -450, y: 200 }, data: { label: 'Auditory', description: '' } },
    { id: 'visual', position: { x: -450, y: 300 }, data: { label: 'Visual', description: '' } },
    { id: 'interface', position: { x: 600, y: -50 }, data: { label: 'Interface Styling', description: '' } },
    { id: 'readaid', position: { x: 600, y: -150 }, data: { label: 'Reading Aid', description: '' } },
    { id: 'autocomp', position: { x: 500, y: -300 }, data: { label: 'Autocomplete', description: '' } },
    { id: 'spell', position: { x: 350, y: -350 }, data: { label: 'Spellchecker', description: '' } },
    { id: 'org', position: { x: 150, y: -400 }, data: { label: 'Organization of Content', description: '' } },
    { id: 'intelem', position: { x: -50, y: -300 }, data: { label: 'Interaction Elements', description: '' } },
    { id: 'user', position: { x: -250, y: -300 }, data: { label: 'User Guide', description: '' } },
    { id: 'adaptive', position: { x: -50, y: -300 }, data: { label: 'Adaptive User Interface', description: '' } },
    { id: 'visualaids', position: { x: -500, y: -300 }, data: { label: 'Visual Aids', description: '' } },
    { id: 'virtual', position: { x: -400, y: 100 }, data: { label: 'Virtual Reality', description: '' } },
    { id: 'rewards', position: { x: 450, y: 150 }, data: { label: 'Rewards', description: '' } },
    { id: 'reminders', position: { x: 400, y: 200 }, data: { label: 'Reminders', description: '' } },
    { id: 'schedule', position: { x: 300, y: 250 }, data: { label: 'Schedule', description: '' } },
    { id: 'progress', position: { x: 150, y: 200 }, data: { label: 'Progress Tracker', description: '' } },
    { id: 'sound', position: { x: -500, y: 0 }, data: { label: 'Sound Control', description: '' } },
    { id: 'media', position: { x: -200, y: -450 }, data: { label: 'Media Features', description: '' } },
    { id: 'limited', position: { x: -50, y: -400 }, data: { label: 'Limited Information', description: '' } },
  ];
  const initialEdges = [
    { id: 'e1-2', source: 'neuro', target: 'asd', data: {label: 'is_extended_by', description: 'Autism is part of the class of Neurodivergent Disorders.' } },
    { id: 'e1-3', source: 'neuro', target: 'adhd' , data: {label: 'is_extended_by', description: 'ADHD is part of the class of Neurodivergent Disorders.' }},
    { id: 'e1-4', source: 'neuro', target: 'dyslexia' , data: {label: 'is_extended_by', description: 'Dyslexia is part of the class of Neurodivergent Disorders.'}},
    { id: 'e4-5', source: 'dyslexia', target: 'taskcomp' , data: {label: 'Dyslexia has_issue_with Task Completion', description: 'People with dyslexia have a working memory deficit, which means that concentration on writing quality may be detrimental to understanding.'}},
    { id: 'e3-6', source: 'dyslexia', target: 'learn' , data: {label: 'has_issue_with', description: 'Lack of focus, inability to sit still for long periods of time, forgetfulness, impulsivity, time management difficulties and disorganization are some of the characteristics of ADHD.'}},
    { id: 'e2-6', source: 'dyslexia', target: 'concentration' , data: {label: 'has_issue_with', description: 'Many of the symptoms of Autism originate with impairments in the Executive Functions, such as in working memory, cognitive, flexibility, planning, generativity, self-monitoring and inhibition.'}},
    { id: 'e2-7', source: 'dyslexia', target: 'navigation' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-8', source: 'dyslexia', target: 'writing' , data: {label: 'Dyslexia has_issue_with writing', description: 'Writing is a complex process involving many different functions, integrated by the working memory system;. People with dyslexia have a working memory deficit, which makes concentrating on writing quality difficult.', questions: "How is your application accomodating writing impairments?"}},
    { id: 'e2-9', source: 'dyslexia', target: 'reading' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-10', source: 'dyslexia', target: 'scan' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-11', source: 'asd', target: 'sensory' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-12', source: 'sensory', target: 'auditory' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-13', source: 'sensory', target: 'visual' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-14', source: 'reading', target: 'interface' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-15', source: 'reading', target: 'readaid' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-16', source: 'writing', target: 'autocomp' , data: {label: 'Writing solved_by Autocomplete', description: '' } },
    { id: 'e2-17', source: 'writing', target: 'spell' , data: {label: 'Writing solved_by Spellchecker', description: 'poor spelling is a challenge faced by people with dyslexia and therefore Spellcheckers are a crucial tool for people with that condition.', questions:"Does your application support Spellchecking?"}},
    { id: 'e2-18', source: 'navigation', target: 'org' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-19', source: 'navigation', target: 'intelem' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-20', source: 'learn', target: 'user' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-21', source: 'concentration', target: 'visualaids' , data: {label: 'has_issue_with', description: '' } }, 
    { id: 'e2-22', source: 'concentration', target: 'virtual' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-23', source: 'concentration', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-24', source: 'taskcomp', target: 'rewards' , data: {label: 'Task Completion solved by Rewards', description: '' } },
  { id: 'e2-25', source: 'taskcomp', target: 'reminders' , data: {label: 'Task Completion solved by Reminders', description: '' } },
  { id: 'e2-26', source: 'taskcomp', target: 'schedule' , data: {label: 'Task Completion solved by Schedule', description: '' } },
  { id: 'e2-27', source: 'taskcomp', target: 'progress' , data: {label: 'Task Completion solved by Task Progress Tracker', description: '' } },
  { id: 'e2-28', source: 'taskcomp', target: 'adaptive' , data: {label: 'Task Completion solved by Adaptive User Interface', description: 'In order to develop software that is able to accommodate the users diverse characteristics, there should be applied an Adaptive User Interfaces (AUI’s), in order to adapt the way the user interacts to the software system to his characteristics and context of use.'}},
  { id: 'e2-29', source: 'scan', target: 'visualaids' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-30', source: 'auditory', target: 'sound' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-31', source: 'auditory', target: 'media' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-32', source: 'visual', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-33', source: 'intelem', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-34', source: 'limited', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-35', source: 'interface', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-36', source: 'media', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-37', source: 'asd', target: 'learn' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-38', source: 'asd', target: 'concentration' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-39', source: 'asd', target: 'taskcomp' , data: {label: 'has_issue_with', description: '' } },
  { id: 'e2-40', source: 'adhd', target: 'taskcomp' , data: {label: 'ADHD struggle with Task Completion', description: 'People with ADHD experience forgetfulness, time management difficulties and disorganization, which detriments their ability to complete tasks. '}},
  { id: 'e2-41', source: 'adhd', target: 'concentration' , data: {label: 'ADHD struggle with Concentration', description: 'Lack of focus, inability to sit still for long periods of time, and forgetfulness, are some of the early indications of ADHD.'}},
  { id: 'e2-42', source: 'adhd', target: 'learn' , data: {label: 'ADHD struggle with Learning', description: '' } },

];


const adhdNodes = [
  { id: 'adhd', position: { x: 0, y: 100 }, data: { label: 'ADHD', description: 'ADHD (Attention-Deficit/Hyperactivity Disorder) is a neurodevelopmental disorder usually detected in childhood and persists into adulthood. Common symptoms include lack of focus, restlessness, forgetfulness, impulsivity, time management issues, disorganization, and emotional dysregulation ' } },
  { id: 'taskcomp', position: { x: 250, y: 100 }, data: { label: 'Task Completion', description: 'The ability to understand the meaning behind a text.' } },
  { id: 'learn', position: { x: -100, y: -200 }, data: { label: 'Learning', description: 'The ability to follow instructions and complete a task from beginning to the end.' } },
  { id: 'concentration', position: { x: -400, y: -150 }, data: { label: 'Concentration', description: 'High sensitivity in the sensory capacity.' } },
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
  { id: 'media', position: { x: -200, y: -450 }, data: { label: 'Media Features', description: 'High sensitivity in the sensory capacity.' } },
  { id: 'limited', position: { x: -50, y: -400 }, data: { label: 'Limited Information', description: 'High sensitivity in the sensory capacity.' } },

];

const adhdEdges = [
  { id: 'e2-20', source: 'learn', target: 'user' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-21', source: 'concentration', target: 'visualaids' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-22', source: 'concentration', target: 'virtual' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-23', source: 'concentration', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-24', source: 'taskcomp', target: 'rewards' , data: {label: 'Task Completion solved by Rewards', description: 'To help ADHD users complete their tasks, a reward should be given once each activity is done to serve as motivation.'}},
  { id: 'e2-25', source: 'taskcomp', target: 'reminders' , data: {label: 'Task Completion solved by Reminders', description: 'To help ADHD users complete their tasks, one of the requirement should be to have a reminder that will send an alert when the task approaches its deadline'}},
  { id: 'e2-26', source: 'taskcomp', target: 'schedule' , data: {label: 'Task Completion solved by Schedule', description: 'To help ADHD users prioritize their chores based on two factors: deadlines and difficulty, the user should be given a schedule with their duties prioritized, allowing them to conveniently begin and complete tasks'}},
  { id: 'e2-27', source: 'taskcomp', target: 'progress' , data: {label: 'Task Completion solved by Task Progress Tracker', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-28', source: 'taskcomp', target: 'adaptive' , data: {label: 'Task Completion solved by Adaptive User Interface', description: 'In order to develop software that is able to accommodate the users diverse characteristics, there should be applied an Adaptive User Interfaces (AUI’s), in order to adapt the way the user interacts to the software system to his characteristics and context of use.'}},
  { id: 'e2-33', source: 'intelem', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-34', source: 'limited', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-35', source: 'interface', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-36', source: 'media', target: 'adaptive' , data: {label: 'has_issue_with', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-40', source: 'adhd', target: 'taskcomp' , data: {label: 'ADHD struggle with Task Completion', description: 'People with ADHD experience forgetfulness, time management difficulties and disorganization, which detriments their ability to complete tasks. '}},
  { id: 'e2-41', source: 'adhd', target: 'concentration' , data: {label: 'ADHD struggle with Concentration', description: 'Lack of focus, inability to sit still for long periods of time, and forgetfulness, are some of the early indications of ADHD.'}},
  { id: 'e2-42', source: 'adhd', target: 'learn' , data: {label: 'ADHD struggle with Learning', description: 'ADHD is a disorder of self-regulation and its underlying executive functioning, and define Executive function (EF) as an umbrella term used for a range of cognitive processes, including planning, working memory, attention, and inhibition.'}},
];

const asdNodes = [
 { id: 'neuro', position: { x: 0, y: 0 }, data: { label: 'Neurodivergent Condition', description: 'Neurodiversity is the diversity of human brains and minds. Neurodivergent, refers to individuals whose brain functions differ significantly from societal norms of "normal." This can be due to genetic factors, experiences altering brain function, or a combination of both. Examples include autism and dyslexia.' } },
 { id: 'adhd', position: { x: 0, y: 100 }, data: { label: 'ADHD', description: 'ADHD (Attention-Deficit/Hyperactivity Disorder) is a neurodevelopmental disorder usually detected in childhood and persists into adulthood. Common symptoms include lack of focus, restlessness, forgetfulness, impulsivity, time management issues, disorganization, and emotional dysregulation ' } },
 { id: 'asd', position: { x: -200, y: -100 }, data: { label: 'ASD' , description: 'Autism Spectrum Disorder (ASD) is a lifelong neurological disorder and is characterized by deficits in communication and social interactions, as well as restrictive and stereotyped behaviors. '} },
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

const asdEdges = [
  { id: 'e1-2', source: 'neuro', target: 'asd', data: {label: 'is_extended_by', description: 'Autism is part of the class of Neurodivergent Disorders.' } },
  { id: 'e1-3', source: 'neuro', target: 'adhd' , data: {label: 'is_extended_by', description: 'ADHD is part of the class of Neurodivergent Disorders.' }},
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
  { id: 'e2-24', source: 'taskcomp', target: 'rewards' , data: {label: 'Task Completion solved by Rewards', description: 'To help ADHD users complete their tasks, a reward should be given once each activity is done to serve as motivation.'}},
  { id: 'e2-25', source: 'taskcomp', target: 'reminders' , data: {label: 'Task Completion solved by Reminders', description: 'To help ADHD users complete their tasks, one of the requirement should be to have a reminder that will send an alert when the task approaches its deadline'}},
  { id: 'e2-26', source: 'taskcomp', target: 'schedule' , data: {label: 'Task Completion solved by Schedule', description: 'To help ADHD users prioritize their chores based on two factors: deadlines and difficulty, the user should be given a schedule with their duties prioritized, allowing them to conveniently begin and complete tasks'}},
  { id: 'e2-27', source: 'taskcomp', target: 'progress' , data: {label: 'Task Completion solved by Task Progress Tracker', description: 'Autism spectrum disorder (ASD) is a neurodevelopmental disorder characterized by various sensory perceptual and cognitive issues that lead to far-reaching challenges in autistics’ social and daily lives.'}},
  { id: 'e2-28', source: 'taskcomp', target: 'adaptive' , data: {label: 'Task Completion solved by Adaptive User Interface', description: 'In order to develop software that is able to accommodate the users diverse characteristics, there should be applied an Adaptive User Interfaces (AUI’s), in order to adapt the way the user interacts to the software system to his characteristics and context of use.'}},
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
  { id: 'e2-40', source: 'adhd', target: 'taskcomp' , data: {label: 'ADHD struggle with Task Completion', description: 'People with ADHD experience forgetfulness, time management difficulties and disorganization, which detriments their ability to complete tasks. '}},
  { id: 'e2-41', source: 'adhd', target: 'concentration' , data: {label: 'ADHD struggle with Concentration', description: 'Lack of focus, inability to sit still for long periods of time, and forgetfulness, are some of the early indications of ADHD.'}},
  { id: 'e2-42', source: 'adhd', target: 'learn' , data: {label: 'ADHD struggle with Learning', description: 'ADHD is a disorder of self-regulation and its underlying executive functioning, and define Executive function (EF) as an umbrella term used for a range of cognitive processes, including planning, working memory, attention, and inhibition.'}},

];

const dyslexiaNodes = [
  { id: 'dyslexia', position: { x: 200, y: -100 }, data: { label: 'Dyslexia', description: 'Dyslexia is a specific learning disability which is neurological in origin. It is characterized by difficulties with accurate and/or fluent word recognition and by poor spelling and decoding abilities. These difficulties often result from a deficit in the phonological component of language, leading to secondary consequences such as problems in reading comprehension. Research broadly agrees on the distinction of three types of dyslexia: phonological, surface, and deep dyslexia' } },
    { id: 'taskcomp', position: { x: 250, y: 100 }, data: { label: 'Task Completion', description: '' } },
    { id: 'learn', position: { x: -100, y: -200 }, data: { label: 'Learning', description: '' } },
    { id: 'concentration', position: { x: -400, y: -150 }, data: { label: 'Concentration', description: '' } },
    { id: 'navigation', position: { x: 200, y: -200 }, data: { label: 'Navigation', description: '' } },
    { id: 'writing', position: { x: 400, y: -200 }, data: { label: 'Writing', description: '' } },
    { id: 'reading', position: { x: 400, y: -100 }, data: { label: 'Reading', description: '' } },
    { id: 'scan', position: { x: 450, y: 0 }, data: { label: 'Scanning for Information', description: '' } },
    { id: 'interface', position: { x: 600, y: -50 }, data: { label: 'Interface Styling', description: '' } },
    { id: 'readaid', position: { x: 600, y: -150 }, data: { label: 'Reading Aid', description: '' } },
    { id: 'autocomp', position: { x: 500, y: -300 }, data: { label: 'Autocomplete', description: '' } },
    { id: 'spell', position: { x: 350, y: -350 }, data: { label: 'Spellchecker', description: '' } },
    { id: 'org', position: { x: 150, y: -400 }, data: { label: 'Organization of Content', description: '' } },
    { id: 'intelem', position: { x: -50, y: -300 }, data: { label: 'Interaction Elements', description: '' } },
    { id: 'user', position: { x: -250, y: -300 }, data: { label: 'User Guide', description: '' } },
    { id: 'adaptive', position: { x: -50, y: -300 }, data: { label: 'Adaptive User Interface', description: '' } },
    { id: 'visualaids', position: { x: -500, y: -300 }, data: { label: 'Visual Aids', description: '' } },
    { id: 'virtual', position: { x: -400, y: 100 }, data: { label: 'Virtual Reality', description: '' } },
    { id: 'rewards', position: { x: 450, y: 150 }, data: { label: 'Rewards', description: '' } },
    { id: 'reminders', position: { x: 400, y: 200 }, data: { label: 'Reminders', description: '' } },
    { id: 'schedule', position: { x: 300, y: 250 }, data: { label: 'Schedule', description: '' } },
    { id: 'progress', position: { x: 150, y: 200 }, data: { label: 'Progress Tracker', description: '' } },
    { id: 'media', position: { x: -200, y: -450 }, data: { label: 'Media Features', description: '' } },
    { id: 'limited', position: { x: -50, y: -400 }, data: { label: 'Limited Information', description: '' } },
  ];
  const dyslexiaEdges = [
    { id: 'e4-5', source: 'dyslexia', target: 'taskcomp' , data: {label: 'Dyslexia has_issue_with Task Completion', description: 'People with dyslexia have a working memory deficit, which means that concentration on writing quality may be detrimental to understanding.'}},
    { id: 'e3-6', source: 'dyslexia', target: 'learn' , data: {label: 'has_issue_with', description: 'Lack of focus, inability to sit still for long periods of time, forgetfulness, impulsivity, time management difficulties and disorganization are some of the characteristics of ADHD.'}},
    { id: 'e2-6', source: 'dyslexia', target: 'concentration' , data: {label: 'has_issue_with', description: 'Many of the symptoms of Autism originate with impairments in the Executive Functions, such as in working memory, cognitive, flexibility, planning, generativity, self-monitoring and inhibition.'}},
    { id: 'e2-7', source: 'dyslexia', target: 'navigation' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-8', source: 'dyslexia', target: 'writing' , data: {label: 'Dyslexia has_issue_with writing', description: 'Writing is a complex process involving many different functions, integrated by the working memory system;. People with dyslexia have a working memory deficit, which makes concentrating on writing quality difficult.', questions: "How is your application accomodating writing impairments?"}},
    { id: 'e2-9', source: 'dyslexia', target: 'reading' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-10', source: 'dyslexia', target: 'scan' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-14', source: 'reading', target: 'interface' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-15', source: 'reading', target: 'readaid' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-16', source: 'writing', target: 'autocomp' , data: {label: 'Writing solved_by Autocomplete', description: '' } },
    { id: 'e2-17', source: 'writing', target: 'spell' , data: {label: 'Writing solved_by Spellchecker', description: 'poor spelling is a challenge faced by people with dyslexia and therefore Spellcheckers are a crucial tool for people with that condition.', questions:"Does your application support Spellchecking?"}},
    { id: 'e2-18', source: 'navigation', target: 'org' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-19', source: 'navigation', target: 'intelem' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-20', source: 'learn', target: 'user' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-21', source: 'concentration', target: 'visualaids' , data: {label: 'has_issue_with', description: '' } }, 
    { id: 'e2-22', source: 'concentration', target: 'virtual' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-23', source: 'concentration', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-24', source: 'taskcomp', target: 'rewards' , data: {label: 'Task Completion solved by Rewards', description: '' } },
    { id: 'e2-25', source: 'taskcomp', target: 'reminders' , data: {label: 'Task Completion solved by Reminders', description: '' } },
    { id: 'e2-26', source: 'taskcomp', target: 'schedule' , data: {label: 'Task Completion solved by Schedule', description: '' } },
    { id: 'e2-27', source: 'taskcomp', target: 'progress' , data: {label: 'Task Completion solved by Task Progress Tracker', description: '' } },
    { id: 'e2-28', source: 'taskcomp', target: 'adaptive' , data: {label: 'Task Completion solved by Adaptive User Interface', description: 'In order to develop software that is able to accommodate the users diverse characteristics, there should be applied an Adaptive User Interfaces (AUI’s), in order to adapt the way the user interacts to the software system to his characteristics and context of use.'}},
    { id: 'e2-29', source: 'scan', target: 'visualaids' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-33', source: 'intelem', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-34', source: 'limited', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-35', source: 'interface', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
    { id: 'e2-36', source: 'media', target: 'adaptive' , data: {label: 'has_issue_with', description: '' } },
  
];

 
export default function App() {

  const location = useLocation();

  const [selectedNodes, setSelectedNodes] = React.useState(adhdNodes);
  const [selectedEdges, setSelectedEdges] = React.useState(adhdEdges);


  useEffect(() => {
    if(location.state.type == null){
      
    }
    else if(location.state.type == 'adhd') {
      setSelectedEdges(adhdEdges)
      setSelectedNodes(adhdNodes)
    }
    else if(location.state.type == 'asd') {
      setSelectedEdges(asdEdges)
      setSelectedNodes(asdNodes)
    }
    else if(location.state.type == 'dyslexia') {
      setSelectedEdges(dyslexiaEdges)
      setSelectedNodes(dyslexiaNodes)
    }
    else {
      setSelectedEdges(initialEdges)
      setSelectedNodes(initialNodes)
    }
    },[]);  


  const onNodeClick = (event, node) => {
    setSelectedLabel(node.data.label);
    setSelectedDescription(node.data.description);
    setOpen(true);
    console.log('click node', node.data.label)
  };

  const onEdgeClick = (event, edge) => {
    setSelectedLabel(edge.data.label);
    setSelectedDescription(edge.data.description);
    setOpen(true);
    console.log('click edge', edge.data.label)
  };


  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [selectedLabel, setSelectedLabel] = React.useState(initialNodes[1].data.label);
  const [selectedDescription, setSelectedDescription] = React.useState(initialNodes[1].data.description);
  
  

  return (
    <>
    <div style={{ width: '100vw', height: '100vh' ,backgroundColor: '#FFFFFF'}} >
      <b>
        <a href="/selector">Go Back</a>
      </b>

      <ReactFlow 
            nodes={selectedNodes} 
            edges={selectedEdges} 
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
            {selectedLabel}
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