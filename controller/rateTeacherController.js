export const rateTeacherController = async (req, res) => {
    try {



    }


    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error,
        })


    }
}