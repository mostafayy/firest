
import './App.css';
import { useState } from 'react';
import{Header,Title,Img,SeachInput,SeachComponent,SeeMoreText}from './Header'
import styled from "styled-components"
import {FcSearch} from 'react-icons/fc'
import axios, { Axios } from 'axios'
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import Dialog from "@material-ui/core/Dialog"
const ResipeComponents=(props)=>{
// console.log("props",props)
const {recipeobj} =props;
const [show,setShow]=useState(false);
return(
  <>
  <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          {/* <Title>{label}</Title> */}
          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {recipeobj.ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Ingredents onClick={() => window.open(recipeobj.url)}>See More</Ingredents>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
  <ResipeContainer>
<CoverImage src={recipeobj.image}/>
<ResipeName>{recipeobj.label}</ResipeName>
<Ingredents onClick={()=>setShow(true)}>Ingredients</Ingredents>
<MoreText onClick={()=>window.open(recipeobj.url)}>see comolete Recips</MoreText>
</ResipeContainer>
  </>
  )
};



function App() {
  const [timeoutid,setTimeoutId]=useState()
  const [recipedata,setRecipedata]=useState([])
  const APP_ID="f373de7b"
  const APP_KEY="7f147b20b160c284278b2c8eaef42f6d"
  const FetchResipe=(search)=>{
    axios.get(
  `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
  ).then(function(response){
    console.log(response.data.hits)
    // console.log(props)

    setRecipedata(response.data.hits)
  })
  }
  const OnTextchange=(event)=>{
clearTimeout(timeoutid)
const Timeout=setTimeout(()=> FetchResipe(event.target.value),500)
setTimeoutId(Timeout)

  }
  return (
<Container>
    <Header>
<Title>
<Img className='kik' src='hamburger.svg' alt=''/>
  Recipe

</Title>
<SeachComponent>
  <FcSearch/>
<SeachInput placeholder='search Recipe' onChange={OnTextchange}/>
</SeachComponent>
    </Header>
<Cont>

      <ResipeList>
<ResipeContainer>
  {recipedata.length ?(
    recipedata.map((recipeobj)=>(
      <ResipeComponents recipeobj={recipeobj.recipe}/>))
      ):(
        <Place src="hamburger.svg"/>
        )}  
    </ResipeContainer> 

  </ResipeList> 
  </Cont>

  </Container>

  );
}
const Container =styled.div`
// display: flex;
//  flex-direction: column;
`
const Cont =styled.div`
display: flex;
flex-direction: row;
`
const ResipeList=styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: flex-start;
flex-flow: row wrap;
padding: 30px;
 justify-content: center;
 gap:20px;
`
const ResipeContainer=styled.div`
display: flex;
flex-direction: column;
// flex-wrap: wrap;
padding: 10px;
width: 300px;
height: 500px;
margin-bottom: 20px;
box-shadow: 0 3px 10px 0 #aaa;
`
const CoverImage=styled.img`
height: 200px;
`
const ResipeName=styled.span`
font-size: 18px;
font-weight: bold;
color: black;
margin: 10px 0;

`
const Ingredents=styled.span`
font-size: 18px;
font-weight: bold;
border:solid 1px green;
color: black;
cursor: pointer;
margin: 5px 0;
padding:10px 15px ;
border-radius: 4px;
color: green;
text-align: center;
margin-bottom: 10px;

`
const MoreText=styled(Ingredents)`
color: #eb3300;
border:solid 1px #eb3300;
`
const Place=styled.img`
width: 120px;
height: 120px;
margin: 200px; 

`
export default App;
