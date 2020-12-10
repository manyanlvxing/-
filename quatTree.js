
class TreeNode {
    constructor(x, y, w, h, limitNum) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.limitNum = limitNum;

        this.nodes = [];
        this.childs = [];

        this.childNum = 0;

        this.drawLine(x, y, w, h);

    }
    drawLine(x, y, w, h) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");

        ctx.strokeStyle = "red";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, w, h);
    }
    addChild(x, y) {
        //如果有子块，找子块里面的位置
        if (this.nodes.length) {
            let grid = this.searchGrids(x, y);
            grid.addChild(x, y);
        } else {
            if (this.childNum >= this.limitNum) {
                this.createGrids();
                this.addChild(x, y);
            } else {
                this.childs.push({ x, y });

                this.childNum++;
            }
        }
    }
    searchGrids(x, y) {

        let q = [...this.nodes];

        while (q.length) {

            let g = q.shift();

            if (g.contain(x, y)) {
                return g.searchGrids(x, y);
            }
        }

        return this;
    }

    createGrids() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let x = this.x + this.w / 2 * j;
                let y = this.y + this.h / 2 * i;

                let node = new TreeNode(x, y, this.w / 2, this.h / 2, this.limitNum);


                this.nodes.push(node);
            }
        }

        this.updateItems();



    }

    updateItems() {

        for (let pos of this.childs) {
            this.addChild(pos.x, pos.y);
        }

        this.childs = [];
        this.childNum = 0;

    }

    contain(x, y) {
        return x >= this.x && x < this.x + this.w && y >= this.y & y < this.y + this.h
    }
}

class QuatTree {
    constructor(x, y, w, h, limitNum) {
        this.root = new TreeNode(x, y, w, h, limitNum);

        this.totalNum = 0;
    }
    addChild(x, y) {
        this.root.addChild(x, y);
        this.totalNum++;

    }
    initGrids() {



    }
    createGrids() {




    }


    travel() {
        let n = 0;
        dfs(this.root);
        function dfs(grid) {
            if (grid.nodes.length == 0) {
                n += grid.childNum;
                console.log(grid.childNum);
            } else {
                for (let value of grid.nodes) {
                    dfs(value);
                }
            }
        }

        console.log(this.totalNum, n);

    }
    searchGrids(rect) {



    }


}