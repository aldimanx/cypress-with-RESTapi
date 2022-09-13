import randomizer from "../support/randomizer"
let token = 'Bearer 4e1b37f5ad176755ac01deb0844d4b4aba447fc85086136c665a32a3e8999c74'
let url = "https://gorest.co.in/public/v2/users/"
let rand = new randomizer
let email = rand.makeid(10)+"@tegsag.net"
let gender = rand.getGender()
let status = rand.getStatus()
let json = 'application/json'
let newid

describe('Testing API DANA Endpoints Using Cypress', () => {
    

it("001 Test POST Request", () => {
    cy.request({
        method: 'POST',
        url: url,
        failOnStatusCode: false,

        headers: {
            'Authorization': token,
            'Accept': json,
            'Content-Type': json,
        },

        body: {
            "name": "aldy test",
            "email": email,
            "gender": gender,
            "status": status,
        },

        }).then((response) => { 
            
            cy.log(JSON.stringify(response.body))
            cy.wrap(response.body.id).as('id')
            newid =response.body.id

            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property("name")
            expect(response.body).to.have.property('email')
            expect(response.body).to.have.property('gender')
            expect(response.body).to.have.property('status')

    })	
})
it('002 Test GET Request', () => {
    cy.request({
        method : 'GET',
        url : url+newid,
        headers: {
            'Authorization': token,
            'Accept': json,
            'Content-Type': json,
        },

        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body.id).to.eq(newid)
            expect(response.body.name).to.eq("aldy test")
            expect(response.body.email).to.eq(email)
            expect(response.body.gender).to.eq(gender)
            expect(response.body.status).to.eq(status)
    })
})

it('003 Test PUT Request', () => {
    cy.request({
        method : 'PUT',
        url : url+newid,
        headers: {
            'Authorization': token,
            'Accept': json,
            'Content-Type': json,
        },

        body: {
            "name": "aldy edited with PUT",
        },

        }).then((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body.name).to.eq("aldy edited with PUT")
          
    })
})

("004 Test DELETE Request", () => {
    cy.request({
        method : 'DELETE',
        url: url+newid,
        headers: {
            'Authorization': token,
            'Accept': json,
            'Content-Type': json,
        },
        
    }).then((response) => {
        expect(response.body).to.be.empty
                
        })	
    })
    
})
        