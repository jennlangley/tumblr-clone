import { useSelector } from "react-redux"

const MyLikesPage = () => {
    const likes = useSelector(state => state.likes)
    const posts = useSelector(state => state.posts)

    // const likedPosts = 
    return (
        <div>
            
        </div>
    )
}

export default MyLikesPage;