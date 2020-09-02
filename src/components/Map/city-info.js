import * as React from 'react';
import { PureComponent } from 'react';
import Adrress from './ftechAdrress';

export default class CityInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.city}`;
    return (
      <div >

        <div>
          {<Adrress x={info.longitude} y={info.latitude} />}
          <br />
          <a
            target="_new"
            href={`../blog/${info.slug}`}
          >
            {info.title}
          </a>
        </div>
        <img width={240} src={info.image} />
      </div>
    );
  }
}