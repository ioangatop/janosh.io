import React, { useState, Fragment } from "react"

import { ProjectExcerpt, Img } from "./styles"
import Project from "./Project"
import Grid from "../../components/styles/Grid"
import Modal from "../../components/Modal"

const Projects = ({ projects }) => {
  const [modal, setModal] = useState()
  return (
    <Grid minWidth="15em" gap="1em">
      {projects.map(({ node }, index) => {
        const { title, cover } = node.frontmatter
        return (
          <Fragment key={title}>
            <ProjectExcerpt onClick={() => setModal(index)}>
              <Img fluid={cover.img.sharp.fluid} />
              <h3>{title}</h3>
            </ProjectExcerpt>
            <Modal open={index === modal} closeModal={setModal}>
              <Project {...node.frontmatter} html={node.html} />
            </Modal>
          </Fragment>
        )
      })}
    </Grid>
  )
}

export default Projects