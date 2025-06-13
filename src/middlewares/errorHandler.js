export const errorHandler = (error, _, res, __) => {
    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        data: error.message
    });
};