import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const CardComponent = ({ title, subTitle, color, width, dashData }) => {
  var dashData2=parseFloat(dashData).toFixed(2);
  return (
    <div>
    <MuiThemeProvider >
    <Card style={{ width: width, marginTop: "8px", background: color }}>
        <CardHeader
            title={ title }
        />
      <CardContent>
        { dashData!="" ? 
          <Typography color="textPrimary" variant="h6" gutterBottom>
            { subTitle + dashData2 + " GBP"  }
          </Typography>
        :
          <Typography color="textPrimary" variant="h6" gutterBottom>
            { subTitle }
          </Typography>
         }
      </CardContent>
    </Card>
    </MuiThemeProvider >
    </div>
  );
}

export default CardComponent
