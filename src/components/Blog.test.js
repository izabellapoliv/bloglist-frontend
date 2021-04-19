import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let mockHandler = jest.fn()

    beforeEach(() => {
        mockHandler = jest.fn()
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: "Fullstack Open",
            url: "https://fullstackopen.com/",
            likes: 11
        }

        component = render(
            <Blog blog={blog} setBlogs={mockHandler} />
        )
    })

    test('displays title and author by default', () => {
        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(component.container).toHaveTextContent(
            'Fullstack Open'
        )
    })

    test('does not display url and likes by default', () => {
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveClass('d-none')
    })

    test('after clicking the button, url and likes are displayed', () => {
        const button = component.getByText('View more')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveClass('d-none')
    })

})
