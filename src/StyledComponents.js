import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  `

const Title = styled.h1`
  padding: 20px 0;
`

const SearchBar = styled.input`
  display: block;
  width: 50%;
  margin: 20px 0;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`

const Content = styled.div`
  color: #ccc;
  font-size: 2rem;
`

const Image = styled.img`
  width: 25%;
  height: 200px;
  padding: 5px;
  @media only screen and (max-width: 800px) {
      width: 50%;
  }
  @media only screen and (max-width: 550px) {
      width: 100%;
  }
`

const Loading = styled.h4`
  color: #ccc;
`

const EndMessage = styled.p`
  text-align: center;
  font-weight: bold;
`

export {Container, Content, Title, SearchBar, Image, Loading, EndMessage};