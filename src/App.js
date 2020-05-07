import React, {useState} from 'react';
import {Container, Content, Title, SearchBar, Image, Loading, EndMessage} from './StyledComponents'
import InfiniteScroll from 'react-infinite-scroll-component';
import apiData from './api';
import axios from 'axios';

const NOIMAGESMSG = "Type in search bar to get images";
const ENDMSG = "No more images found";
const LOADMSG = "Loading...";
const PLACEHOLDER = "Start typing to get images...";
const TITLE = "Flickr Image Search";

const CancelToken = axios.CancelToken;
let cancel;



function App() {

  const [images, setImages] = useState([]);
  const [term, setTerm] = useState("");
  const [currentPage, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);


  const handleChange = (e) => {
    let newTerm = e.target.value;
    setTerm(newTerm);
    getImages(newTerm, 1)
  }

  const getImages = (text, pg) => {
    /* building the URL */
    const {base, method, safeSearch, format, noJSONCallback, apiKey, contentType, isGetty} = apiData;
    const page = pg;
    const url = `${base}?method=${method}&safe_search=${safeSearch}&format=${format}&nojsoncallback=${noJSONCallback}&api_key=${apiKey}&content_type=${contentType}&is_getty=${isGetty}&page=${page}&text=${text}`
    
    /* cancel any other previous request */
    cancel && cancel()
    /* call the API with the text provided by user */
    axios.get(url, { 
      cancelToken: new CancelToken(function executor(c){
        cancel = c;
      })
     })
    .then(res => res.data)
    .then(res => {
      // console.log(res); /* for debugging purposes */
      /* if the request was initiated by the infinite scroll, append the results, otherwise overwrite */
      const myImages = pg > 1 ? [...images, ...res.photos.photo] : [...res.photos.photo]
      setImages(myImages); 
      setMaxPages(res.photos.pages)
      pg > 1 && setPage(currentPage+1)
    })
    .catch(e => {});
  }

  const showImages = () => (
    images.map((image, i) => {
      const url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
      return (
        <Image src={url} alt={image.title} key={i}/>
      )
    })
  )

  return (
      <Container>
          <Title>{TITLE}</Title>
        
          <SearchBar 
            type="text" 
            name="search" 
            id="search" 
            placeholder={PLACEHOLDER} 
            value={term} 
            onChange={e => handleChange(e)}
          />
        
        <Content>
          <InfiniteScroll
            dataLength={images.length}
            next={() => getImages(term, currentPage+1)}
            hasMore={currentPage > maxPages ? false : true}
            loader={images.length > 1 ? <Loading>{LOADMSG}</Loading> : null}
            endMessage={<EndMessage>{ENDMSG}</EndMessage>}
            >
              {images.length > 0
              ?<div>{showImages()}</div>
              :NOIMAGESMSG}
          </InfiniteScroll>
        </Content>
      </Container>
  );
}

export default App;
