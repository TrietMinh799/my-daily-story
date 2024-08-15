import { Grid } from "@radix-ui/themes"
import { Key, Suspense } from "react"
import Article from "./Article"
import Skeleton from "./Skeleton"

export default function News({ data }: { data: any }) {
    return (
        <Grid columns="3" gap="3" justify="center" width="auto">
            {data && data.map((post: any, index: Key | null | undefined) => {
                return (
                    <Suspense key={index} fallback={<Skeleton />}>
                        <Article user_id="undefined" title={post.title} id={post.id} content={post.content} />
                    </Suspense>
                )
            })}
        </Grid>
    )
}