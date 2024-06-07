import { useNavigate } from 'react-router-dom';

export const Navigate = (where:string) => {
    const navigate = useNavigate();
    if (where === null || where === undefined){
        console.error("Navigate: where is not defined");
        return;
    }
        navigate(where);
        return;
}