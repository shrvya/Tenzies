import './die.css';
function Die(props) {
 const styles={
    backgroundColor:props.isHeld ? "#59E391" : "white"
 }
//  function togglecolor(){
//     return !props.isHeld 
//  }
    return (
      <div className="dice-box" 
      onClick={props.holdDice}  
      style={styles}>
        <h2>
        {props.value}
        </h2>
        
      </div>
    );
  }
  export default Die;
  