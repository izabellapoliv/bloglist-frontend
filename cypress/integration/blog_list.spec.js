describe('Blog app', function () {
    const user = {
        name: 'Jane Smith',
        username: 'mluukkai',
        password: 'salainen',
    }

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('username')
        cy.contains('password')
        cy.contains('Sign in')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            // ...
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#signin-button').click()

            cy.contains('Logged in successfully').should('have.class', 'alert-success')
        })

        it('fails with wrong credentials', function () {
            // ...
            cy.get('#username').type('wrongusername')
            cy.get('#password').type('abcdefg')
            cy.get('#signin-button').click()

            cy.contains('Incorrect credentials').should('have.class', 'alert-danger')
        })
    })

    describe('After sign in', function () {
        beforeEach(function () {
            cy.login({ username: user.username, password: user.password })
        })

        it('A blog can be created', function () {
            cy.get('#new-blog-open').click()

            cy.get('#Title').type('The New Test Blog')
            cy.get('#Author').type('Me Myself and I')
            cy.get('#URL').type('https://www.youtube.com/')
            cy.get('#submit-new-blog').click()

            cy.get('#blog-list').contains('The New Test Blog')
        })

        it.only('Blogs are ordered by the number of likes', function () {
            const blogs = [
                {
                    title: 'This has 5 likes',
                    author: 'WhyWhyWhyWhyWhy',
                    url: 'https://www.youtube.com/',
                    likes: 5
                },
                {
                    title: 'This has 2 likes',
                    author: 'WhyWhyWhy',
                    url: 'https://www.youtube.com/',
                    likes: 2
                },
                {
                    title: 'This has 9 likes',
                    author: 'WhyWhyWhyWhyWhyWhyWhyWhyWhy',
                    url: 'https://www.youtube.com/',
                    likes: 9
                },
            ]
            for (let index = 0; index < blogs.length; index++) {
                const blog = blogs[index];
                cy.addBlog({ blog })
            }
            const correctOrder = blogs.map(blog => blog.likes.toString()).sort().reverse()

            const itemsOrder = []
            cy.get('.each-blog').each(item => {
                itemsOrder.push(item.find('.count-likes').text())
            }).then(() => {
                expect(itemsOrder).to.have.ordered.members(correctOrder)
            })
        })

        describe('and a blog exists', function () {
            const blog = {
                title: 'The New Test Blog',
                author: 'Me Myself and I',
                url: 'https://www.youtube.com/'
            }

            beforeEach(function () {
                cy.addBlog({ blog })
            })

            it('it can be liked', function () {
                cy.get('.count-likes')
                    .invoke('text')
                    .then((likes) => {
                        cy.contains('Thumbs up!')
                            .click()
                        const newLikesExpectation = (parseInt(likes) + 1).toString()

                        cy.get('.count-likes')
                            .invoke('text')
                            .should((newLikes) => {
                                expect(newLikes).to.eq(newLikesExpectation)
                            })
                    })
            })

            it('it can be deleted', function () {
                cy.get('.btn-delete-blog').click()
                cy.get('#blog-list').should('not.contain', blog.title)
            })

            it('it can not be deleted by a different user', function () {
                cy.get('#signout-button').click()

                const newUser = {
                    name: 'John Smith',
                    username: 'foobar',
                    password: 'testpass',
                }
                cy.request('POST', 'http://localhost:3001/api/users/', newUser)

                cy.get('#username').type(newUser.username)
                cy.get('#password').type(newUser.password)
                cy.get('#signin-button').click()

                cy.get('.btn-delete-blog').click()
                cy.get('html')
                    .should('contain', blog.title)
                    .and('contain', 'forbidden')
            })
        })
    })
})