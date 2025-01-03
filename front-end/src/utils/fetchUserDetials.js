import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios"

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.getProfile
        })
        return response;

    } catch (error) {
        console.log(error);
    }

}
export default fetchUserDetails;