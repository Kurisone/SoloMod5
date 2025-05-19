
import "./SpotImage.css"

function SpotImage({ spot }) {

  return (
    <div className="images-grid">
      <img src={spot.previewImage} alt="" className="grid-image-large"/>
      {spot.SpotImage.slice(0, 4).map((img) => {
        return <img key={img.id} src={img.url} alt="" className="grid-image" />;
      })}
    </div>
  );
}

export default SpotImage;