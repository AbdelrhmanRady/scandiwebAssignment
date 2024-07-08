
export default function HomeCard(props){
    const productTypeContent = {
        Book: <h4 className="card-title text-center fw-bolder">Weight: {props.Weight} KGs</h4>,
        Furniture: <h4 className="card-title text-center fw-bolder">Dimensions: {props.Dimensions}</h4>,
        DVD_disc: <h4 className="card-title text-center fw-bolder">Size: {props.Size } MB</h4>
      };
    return(
        <div className="col mb-5">
            <div className="card h-100 px-3 pt-2">
                <div className="form-check form-check-inline">
                    <input className="form-check-input ml-5 .delete-checkbox" 
                    type="checkbox" 
                    id={props.SKU} 
                    value={props.SKU} 
                    onChange={() => props.handleChange(props.SKU)}
                    checked={props.isChecked}/>
                </div>
                <div className="card-body p-1">
                    <div className="text-center">
                        <h4 className="card-title text-center fw-bolder">{props.SKU}</h4>
                        <h4 className="card-title text-center fw-bolder">{props.Name}</h4>
                        <h4 className="card-title text-center fw-bolder">{props.Price} $</h4>
                        {productTypeContent[props.Type]}
                    </div>
                </div>
            </div>
        </div>
    );
}