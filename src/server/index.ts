import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import * as bodyParser from 'body-parser';
import { Item, ItemType, ItemStatus } from '../models';

const filePath = path.join(os.homedir(), 'data.json');

let items: Item[], itemTypes: ItemType[], maxId: number;
const saveData = () => {
  fs.writeFileSync(filePath, JSON.stringify({ items, itemTypes }));
};

const jsonParser = bodyParser.json();
express()
  .get('/favicon.ico', (req, res) => res.status(204))
  .get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../webpack/index.html'));
  })
  .get('/api/data', (req, res) => res.json({ itemTypes, items }))
  .post(
    '/api/item/complete',
    jsonParser as express.RequestHandler,
    (req, res) => {
      const itemId = Number(req.body.itemId);
      const item = items.find(({ id }) => id === itemId);
      if (item) {
        item.status = ItemStatus.complete;
        saveData();
        return res.status(200).end();
      }
      res.status(404);
    }
  )
  .post('/api/item', jsonParser as express.RequestHandler, (req, res) => {
    const { itemType } = req.body;
    if (itemType) {
      const type = itemTypes.find(({ name }) => name === itemType);
      if (type) {
        const item:Item = { type, id: ++maxId, status: ItemStatus.open };
        items.push(item);
        saveData();
        return res.send(String(item.id)).end();
      }
    }
    res.status(500);
  })
  .post('/api/itemType', jsonParser as express.RequestHandler, (req, res) => {
    const { name } = req.body;
    if (name && !itemTypes.find(type => type.name === name)) {
      itemTypes.push({ name });
      saveData();
      return res.status(200).end();
    }
    res.status(500);
  })
  .delete('/api/item', jsonParser as express.RequestHandler, (req, res) => {
    const itemId = Number(req.body.itemId);
    const index = items.findIndex(({ id }) => id === itemId);
    if (index !== -1) {
      items.splice(index, 1);
      saveData();
      return res.status(200).end();
    }
    res.status(500);
  })
  .use('/', express.static(path.join(__dirname, '../webpack')))
  .listen(8080, () => {
    const createData = () => {
      maxId = (itemTypes = [{ name: 'Type A' }, { name: 'Type B' }]).length;
      items = itemTypes.map((type, index) => ({
        id: index + 1,
        type,
        status: ItemStatus.open
      }));

      saveData();
    };

    if (fs.existsSync(filePath)) {
      try {
        const data = fs.readFileSync(filePath);
        ({ items, itemTypes } = JSON.parse(data.toString('utf8')));
        maxId = items.reduce((max, { id }) => Math.max(max, id), 0);
      } catch (error) {
        createData();
      }
    } else {
      createData();
    }

    console.log('Listening on localhost:8080...');
  });
