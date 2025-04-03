import { useEffect, useRef, useState } from 'react'
import ClaudeRecipe from './ClaudeRecipe'
import IngredientsList from './IngredientsList'
import { getRecipeFromMistral } from './ai'
import './Body.css'

export default function Main(){

    const [ingredients, setIngredients] = useState([])

    function submitIngredient(formData){
        const newIngredient = formData.get('ingredient')
        setIngredients((prevIngredients) => ([...prevIngredients, newIngredient]))
    }

    const [recipe, setRecipe] = useState('')
    const recipeSection = useRef(null)
    console.log(recipeSection)

    async function createRecipe(){
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    useEffect(() => {
        if (recipe !== '' && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [recipe])

    return <main>
        <form action={submitIngredient} className='add-ingredient-form'>
            <input 
            aria-label='Add ingredient'
            placeholder='e.g. rice'
            type="text"
            name='ingredient'
            className='add-ingredient-input' />
            <button className='add-ingredient-button'>+ Add ingredient</button>
        </form>
        <IngredientsList ref={recipeSection} ingredients={ingredients} handleClick={createRecipe}/>
        {recipe ? <ClaudeRecipe recipe={recipe}/> : null}
    </main>
}
