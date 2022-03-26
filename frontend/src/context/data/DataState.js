import DataContext from "./DataContext";
const data = require('../../data.json');

const DataState = (props) => {
    
    const getCourseData = () => {
        return data.courses;
    }

    return (
        <DataContext.Provider value = {{getCourseData}}>
            {props.children}
        </DataContext.Provider>
    )

}

export default DataState;