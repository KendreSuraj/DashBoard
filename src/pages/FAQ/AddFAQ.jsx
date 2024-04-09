import React,{useState, useEffect} from 'react';
import { addFAQ } from '../../store/actions/faq.action';
import {
    Grid,
    Paper,
    TextField,
    Button,
  } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const AddFAQ = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        question: '',
        answer: '',
        
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          if (values.question.trim() === '' || values.answer.trim() === '') {
            alert('Please fill all the fields correctly.');
            return;
          }
    
          const response = await addFAQ({
            question: values.question,
            answer: values.answer,
          });

          
          if (response?.status?.code === 201 || response?.status?.code === 200) {
            navigate('/faq');
          } 
          else {
            alert('Something went wrong');
          }
        } catch (err) {
          alert(err?.response?.data?.status?.message);
        }
      };
    
    
  return (
    <div>
    <h1 style={{ textAlign: 'center' ,marginTop:'10px'}}>Add FAQ</h1>
    <Paper>
  <form>
    <Grid container spacing={2} justifyContent="center"
    style={{marginTop:"30px",padding:"10px"}}
    
    >
      <Grid item xs={10} md={9}>
        <TextField
          variant="outlined"
          label="Question"
          name="question"
          value={values.question}
          onChange={handleInputChange}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={10} md={9}>
        <TextField
          variant="outlined"
          label="Answer"
          name="answer"
          value={values.answer}
          onChange={handleInputChange}
          required
          multiline
          rows={4}
          fullWidth
        />
      </Grid>
    </Grid>

    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ width: '100%', margin: '10px' }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  </form>
</Paper>


    </div>
  )
}

export default AddFAQ;