const express = require("express")
const router = express.Router({ mergeParams: true })
// merge Parameters from bookmarks and reviews route from url -> access to all parameter variables from all routes in server (:id, from bookmarks, :review_id)
// const reviews = express.Router({ mergeParams: true });
const { getAllReviews, getOneReview, createReview, deleteReview, updateReview } = require("../queries/reviews.js")

// reviews merge parameter routing

router.get("/", async (req, res) => {
    const { bookmarkId } = req.params;
  
    try {
      const allReviews = await getAllReviews(bookmarkId);
      res.json(allReviews);
    } catch (err) {
      res.json(err);
    }
  });

// router.get("/", async (req, resp) => {
//     // code to get all Reviews
//     const allReviews = await getAllReviews()
    
//     allReviews[0] ? resp.status(200).json(allReviews) : resp.status(500).json({error: "server error"})
     
// })

router.get("/:id", async (req, resp) => {
    const {id} = req.params
    const review = await getOneReview(id)

    review.id ? resp.status(200).json(review) : resp.status(404).json({ error: "not found" })
})

router.post("/", async (req, resp) =>{
    try {
        const review = await createReview(req.body);
        resp.status(200).json(review);
      } catch (error) {
        resp.status(400).json({ error: error });
      }
})

router.delete("/:id", async (req, resp) => {
    const {id} = req.params
    const deletedReview = await deleteReview(id)

    deletedReview.id ? resp.status(200).json(deletedReview) : resp.status(404).json({Error: "Review Not Found"})
})

router.put("/:id", async (req, resp) => {
    const {id} = req.params
    const updatedReview = await updateReview(id, req.body)

    updatedReview.id ? resp.status(200).json(updatedReview) : resp.status(404).json({Error: "review not found"})
})


module.exports = router