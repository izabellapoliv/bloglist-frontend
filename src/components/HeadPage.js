import React from 'react'
import { Helmet } from "react-helmet";

const HeadPage = () => (
    <Helmet>
        <title>MyTestPage</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
            rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
            crossOrigin="anonymous" />
    </Helmet>
)

export default HeadPage