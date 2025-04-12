import './IngredientsList.css'
import infoicon from '../assets/info.png'

export default function IngredientsList(props){
    const ingredientElements = props.ingredients.map((ingredient) => {
        return <li key='ingredient'>{ingredient}</li>
    })

    const readyForRecipeDiv = <div ref={props.ref} className='get-recipe-div'>
        <div className='get-recipe-text'>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe using your list of ingredients</p>
        </div>
        <button onClick={props.handleClick} className='get-recipe-button'>Get a recipe</button>
    </div>

    var recipeDiv;

    if (props.ingredients.length > 0 && props.ingredients.length > 3){
        recipeDiv = readyForRecipeDiv
    }
    else if(props.ingredients.length > 0 && props.ingredients.length < 4){
        recipeDiv = <div className='more-ingredients more'>
        Chef Claude requires at least 4 ingredients to create a recipe!
    </div>
    }
    else{
        recipeDiv = <div className='more-ingredients'>
        <img src={infoicon} alt="info icon from flat icons" width={16} height={16}/>
        Enter the ingredients you have to begin!
    </div>

}
    return <section id='ingredients'>
        {props.ingredients.length != 0 && <h1 className='ingredients-heading'>Ingredients on hand:</h1>}
        <ul className='ingredients-list'>
            {ingredientElements}
        </ul>
        {recipeDiv}
    </section>
}
