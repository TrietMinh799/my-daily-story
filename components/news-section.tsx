"use client"

import { Container, Grid, Section } from "@radix-ui/themes"
import { Key, SetStateAction, Suspense, useState } from "react"
import Article from "./Article"
import Skeleton from "./Skeleton"
import Pagination from "./Pagination"
import { paginate } from "@/lib/utils"

export default function News({ data, length }: { data: any, length: number }) {

    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6;

    const onPageChange = (page: SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const _data = paginate(data, currentPage, pageSize)

    return (
        <Section>
            <Grid columns="3" gap="3" justify="center" width="auto">
                {_data && _data.map((post: any, index: Key | null | undefined) => {
                    return (
                        <Suspense key={index} fallback={<Skeleton />}>
                            <Article user_id="undefined" title={post.title} id={post.id} content={post.content} />
                        </Suspense>
                    )
                })}
            </Grid>
            <Container p="8">
                <Pagination size={length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
            </Container>
        </Section>
    )
}