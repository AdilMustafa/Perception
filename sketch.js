var gallery = false, left = false, right = false, inspect = false, controls = false;
var eI1 = false, eI2 = false, eI3 = false, eI4 = false, eI5 = false, up = false, down = false, mapCol = false;

var font, floor, light, painting, sign, scroll, pointer, world, wall; 
var r, inspectPainting, blurred, arrow, arrow2, worldY, scrollY, pointerY;
var border, spiralImg, sI2, oi2_img1, gl_img1, gl_img2, gl_img3; 

var angle = 0, circles = []
 

function preload() {
      //loads the assets I created for the art gallery
    floor = loadImage('assets/images/floor.png');
    light = loadImage('assets/images/light.png');
    painting = loadImage('assets/images/painting.png');
    sign = loadImage('assets/images/sign.png');
    wall = loadImage('assets/images/wall.png');
    inspectPainting = loadImage('assets/images/painting2.png');
    arrow = loadImage('assets/images/arrow1.png');
    arrow2 = loadImage('assets/images/arrow2.png');
    border = loadImage('assets/images/painting3.png');
    spiralImg = loadImage('assets/images/spiral2.png');
    sI2 = loadImage('assets/images/spiral3.png');
    oi2_img1 = loadImage('assets/images/img1.png');
    gl_img1 = loadImage('assets/images/gl1.png');
    gl_img2 = loadImage('assets/images/gl2.png');
    gl_img3 = loadImage('assets/images/gl3.png');
}

function setup()
{
    
    
    
    createCanvas(1000,750)
    font = loadFont('assets/font/PressStart2P-Regular.ttf');
    textFont(font);
    scroll = 0; //used to decide the scroll position
    r = 0; //used to turn the pointer red when under a painting
    pointer = width/2; //used to decide the pointer position
    world = pointer - scroll; //links the world position with the pointer position
    
    pointerY = width/2; //used to scroll up and down when inspecting a painting 
    worldY = pointerY - scrollY; //used to link the world y axis to the pointer's y axis
    
    num = 0 //sets the spin speed for optical illusion 1
    num2 = 0 //added to spin speed for optical illusion 1 so when added the display circle doesnt spin aswell 
    num3 = 20 //added to spin the spiral for optical illusion 2
    
    increase = false; //when true num2 gets increased
    decrease = false; //when true num2 gets decreased
    
    circles.push(new circle_function())
    
    speed = 0; //controls the speed of the lines in gestalt painting 1
    
    em = false
    
}

function draw()
{
    //when gallery is false the intro screen appears
    if(!gallery)
    {
        intro()
    }
    
    //when gallery is true the intro screen is removed and the gallery appears
    if(gallery)
    {
        
        if(increase)
        {
            num2 += 0.125 //adds 0.125 to num2 when increase is true 
        }
        
        if(decrease)
        {
            num2 -= 0.125 //takes away 0.125 to num2 when increase is true 
        }
        
        room()//contains all the gallery related code
     
        
    }
    
}

function intro()
{
    background(0)
    
    fill(255)
    textSize(30)
    text("Gestalt Laws Art Gallery", 130, height/2.5)
    
    textSize(25)
    text("Press", 200, height/2)
    text("to Continue", 500, height/2)
    
    fill(255,0,0)
    text("Space", 350, height/2)
    
}

function room()
{
    background(255,0,0)
    
    //makes the background the wall asset I created it uses x,y coordinates
    wallAsset(890,0)
    wallAsset(0,0)
    
    //makes the floor use the floor asset I created is uses x,y coordinates
    floorAsset(0,655)
    floorAsset(512,655)
    

    push()
        //allows me to scroll to offscreen positions
        translate(scroll, 0)
        
        //allows me to display the light asset I created is uses x,y coordinates
        lightAsset(70,177)
        lightAsset(770,177)
    
        lightAsset(1170,177)
        lightAsset(1870,177)
    
        lightAsset(2270,177)
        lightAsset(2970,177)
        
        lightAsset(-370,177)
        lightAsset(-1070,177)
        
        lightAsset(-1470,177)
        lightAsset(-2170,177)
    
       
        
        imageMode(CENTER);
        angleMode(DEGREES);
        rotate(90); //allows me to rotate the painting asset to landscape as originally it was portrait 
    
        //allows me to display the painting asset I created is uses x,y coordinates
        paintingAsset(400,630)
        paintingAsset(400,1730)
        paintingAsset(400,-500)
        paintingAsset(400,-1600)
        paintingAsset(400,-2700)
        
        rotate(-90)
    
        text("Gestalt Laws 1", 420,500)
        text("Gestalt Laws 2", 1520,500)
        text("Gestalt Laws 3", 2620,500)
        text("optical illusion", -715,500)
        text("optical illusion 2", -1830,500)
    
        staticCircle(); //draws the optical illusion circle above the painting
        image(sI2, -1730, 380) //draws the optical illusion spiral above the painting
        image(gl_img1, 500,400)
        image(gl_img2, 1600,400)
        image(gl_img3, 2700,400)
    
    pop()
    
    
    
   
    
    
    image(sign,350,-20)
    fill(255)
    textSize(13)
    text("Gestalt Laws & Illusions", 367, 75, 350)
    text("Art Gallery", 450, 95)
    
    //eI stands for enable inspection, when true r will be set to 255
    if(eI1 || eI2 || eI3 ||eI4 ||eI5) {r = 255}
    
    //turns the pointer red when under a painting
    fill(r,0,0)
    triangle(pointer - 30, 655, pointer, 625, pointer + 30, 655)
    
    //when left is true and inspect is false the user is able to scroll to the left 
    if(left && inspect == false) //[1] From lines 185 to 217 the introduction to programming side scrolling code was used to help create srolling on the Y axis aswell as the X axis.
	{
		if(pointer > width)
		{
			pointer -= 10;
		}
		
        else
		{
			scroll += 10;
		}
	}

    //when right is true and inspect is false the user is able to scroll to the right 
	if(right && inspect == false)
	{
		if(pointer < width*0.1)
		{
			pointer  += 10;
		}
		
        else
		{
			scroll -= 10; 
		}
	}
    
    //when up is true and inspect is true the user is able to scroll up 
    if(up && inspect == true)
    {
        scrollY += 10; 
    }
    
    //when down is true and inspect is true the user is able to scroll down
    if(down && inspect == true)
    {
        scrollY -= 10; 
    }
    
    //updates the worlds x and y position
    world = pointer - scroll;
    worldY = pointerY - scrollY;

    textSize(11)
    fill(255,0,0)
    text("1", 90,20)
    
    fill(0)
    text("Press ", 20,20)
    text("To View The Controls ", 110,20)
    text("x = " + world, 20,40)
    
    //when controls is true the controls UI will be displayed
    if(controls)
    {
        controlsfunction()
    }
    
    
    //displays the onscreen left and right arrows (turns them red when being used)
    push()
        imageMode(CENTER);
        angleMode(DEGREES);
        
        rotate(90);
        image(arrow, 700, -950)
        if(right){ image(arrow2, 700, -950) }
        
        rotate(180);
        image(arrow, -700,50)
        if(left){ image(arrow2,-700,50) }
    pop()
    
    //displays the inspection code, it uses x and y, the third number presents what painting is being inspected so it displays the correct stuff, for example, inspection(275, 715, 1) is located at  X: 275, Y: 715 and it displays all of painting 1's items
    inspection(275, 715, 1)
    inspection(1400, 1800, 2)
    inspection(2500, 2900, 3)
    inspection(-440, -840, 4)
    inspection(-1540, -1940, 5)
}

function keyPressed()
{
    
    if(keyCode == 65 || keyCode == 37 ){left = true;} //when A or the left arrow key is pressed left is true 
    if(keyCode == 68 || keyCode == 39 ){right = true;} //when D or the Right arrow key is pressed right is true 
    if(keyCode == 87 || keyCode == 38 ){up = true;} //when W or the up arrow key is pressed up is true 
    if(keyCode == 83 || keyCode == 40 ){down = true;} //when S or the down arrow key is pressed down is true 
    if(keyCode == 81 ){decrease = true;} //when Q is pressed decrease is true 
    if(keyCode == 69 ){increase = true;} //when E is pressed increase is true 
    if(key == ' '){ mapCol = true,  em = true}
}

function keyReleased()
{
    if(key == ' '){gallery = true, mapCol = false, em = false} //when space is released gallery is true 
    if(keyCode == 65 || keyCode == 37 ){left = false;} //when A or the left arrow key is released left is false
    if(keyCode == 68 || keyCode == 39 ){right = false;} //when D or the Right arrow key is released right is false 
    if(keyCode == 87 || keyCode == 38 ){up = false;} //when W or the up arrow key is released up is false 
    if(keyCode == 83 || keyCode == 40 ){down = false;} //when S or the down arrow key is released down is false 
    
    if(key == '1' || keyCode == 49 ){controls = true;} //when 1 is released controls is true 
    if(key == '2' || keyCode == 50 ){controls = false;} //when 2 is released controls is false

    if(eI1 == true || eI2 == true || eI3 == true || eI4 == true || eI5  == true)
    {
        if(keyCode == 13){inspect = true, scrollY = 0} //if any of the enable inspects are true and enter is released, inspect is true and scroll Y is set to 0
        if(keyCode == 27){inspect = false} //if any of the enable inspects are true and escape is released inspect is false
    }
    
    if(keyCode == 81 ){decrease = false;} //when Q is released decrease is false 
    if(keyCode == 69 ){increase = false;} //when E is released increase is false 
}

//displays the controls when the user presses 1 
function controlsfunction()
{
    fill(255,255,255,100)
        rect(0,0,1000,750)
        
        fill(255)
        stroke(0)
        strokeWeight(3)
        rect(100,100,800,360)
        noStroke()
        
        fill(0)
        textSize(30)
        text("CONTROLS", 390, 150)
        
        textSize(13.5)
        text("Press A or Left Arrow Key to move left", 130, 190)
        text("Press D or Right Arrow Key to move right", 130, 220)
        text("Press S or Down Arrow Key to scroll down when inspecting", 130, 250)
        text("Press W or Up Arrow Key to scroll up when inspecting", 130, 280)
        text("Press Enter to inspect a paintings", 130, 310)
        text("Press Esc to stop inspecting a painting", 130, 340)
        text("Press Q to decrease spin speed (optical illusion 1)", 130, 370)
        text("Press E to decrease spin speed (optical illusion 1)", 130, 400)
        text("Press 2 to exit controls menu", 130, 430)
        
        noStroke()
}




//displays the inspected paintings
function inspection(x, y, painting_)
{
    //everuthing within this if statement is linked to painting 1
    if(painting_ == 1)
    {   
        if(world >= x && world <= y)
        {
            eI1 = true //enable inspection 1 is true
            inspect_code(1) //function is used to type in the first segment of the inspection code to reduce copy and pasted lines
            
            if(inspect == true)
            {
                inspect_code(2) //function is used to type in the second segment of the inspection code to reduce copy and pasted lines
                
                push()
                    gestalt1_code()
                pop()
                
                inspect_code(3) //function is used to type in the third segment of the inspection code to reduce copy and pasted lines
            }
        }

        else{eI1 = false, r = 0} //enable inspection 1 is false and the pointer is black when its not within painting 1's range
    }
    
    
    if(painting_ == 2)
    {   
        if(world >= x && world <= y)
        {
            eI2 = true
            inspect_code(1)

            if(inspect == true)
            {
                inspect_code(2)
                
                push()
                    gestalt2_code()
                pop()
                
                inspect_code(3) 
            }
        }

        else{eI2 = false, r = 0}
    }
    
    
    if(painting_ == 3)
    {   
        if(world >= x && world <= y)
        {
            eI3 = true
            inspect_code(1)

            if(inspect == true)
            {
                inspect_code(2)
                
                push()
                    gestalt3_code(310,550)
                pop()
                
                inspect_code(3) 
            }
        }

        else{eI3 = false, r = 0}
    }
    
    if(painting_ == 4)
    {   
        if(world <= x && world >= y)
        {
            eI4 = true
            inspect_code(1)

            if(inspect == true)
            {
                inspect_code(2)
                
                push()
                    translate(0,scrollY)
                    illusion_circle()//types in the illusion circle code
                pop()
                
                inspect_code(3) 
            }
        }

        else{eI4 = false, r = 0}
    }
    
    if(painting_ == 5)
    {   
        if(world <= x && world >= y)
        {
            eI5 = true
            inspect_code(1)

            if(inspect == true)
            {
                inspect_code(2)
                
                push()
                    translate(0,scrollY)
                    spiral(500,350)//uses the spiral function so the user can see a spinning spiral
                    image(oi2_img1, 250,700)//this image is being used to see the effects the spinning spiral creates
                    textSize(9)
                    text("Scroll down after looking at the center of the spiral for 15 seconds", 190, 630)
                     textSize(14)
                    text("As you can see after looking at the spiral and then looking at the image above it makes the image 'wavy'. ", 210, 1150, 600)
                    text("Like with the previous example, optical illusions often occur due to the limitations in our visual system. due to this, our brain creates 'shortcuts' to overcome our visual limitations; in other words, optical illusions exploit our visual shortcomings.", 210, 1230, 600)
                    
                pop()
                
                
                inspect_code(3) 
            }
        }

        else{eI5 = false, r = 0}
    }


}

//asset functions

function lightAsset(x,y)
{
    image(light,x,y)
}

function wallAsset(x,y)
{
    image(wall,x,y)
}

function paintingAsset(x,y)
{
    image(painting,x,y)
}

function floorAsset(x,y)
{
    image(floor,x,y)
}

function inspect_code(a)
{
    //if a is 1 the code will be used, for example, inspect_code(1)
    if(a === 1)
    {
        r = 255

        fill(r,0,0)
        text("Enter  ", 380,710)

        fill(0)
        text("Press  ", 300,710)
        text("to Inspect the Painting", 460,710)
        
    }
    
        //if a is 2 the code will be used, for example, inspect_code(2) 
        if(a === 2)
        {
            fill(255,255,255,100)
            rect(0,0,1000,750)
            noFill()

            push()
                imageMode(CENTER);
                angleMode(DEGREES);
                rotate(90);
                image(inspectPainting,360,-500) //displays the inspect painting background and rotates it by 90 degrees to be landscape

                //displays the onscreen up and down arrows so the user knows they can scroll up and down (they turn red when being used)
                rotate(270);
                image(arrow, 955,250)
                if(up){ image(arrow2, 955,250) }

                rotate(180);
                image(arrow,-955,-450)
                if(down){ image(arrow2,-955,-450) }
            pop()
            fill(0)


        }
    
        //if a is 3 the code will be used, for example, inspect_code(3)
        if(a === 3)
        {
            //this is used to provide an overlay at the top and bottom of the screen so when scrolling up and down it doesnt display above the painting's borders
            push()
                fill(0)
                rect(0, 655, 1000, 100)
                rect(0, 0, 1000, 80)
                noFill()
                imageMode(CENTER);
                angleMode(DEGREES);
                rotate(90);
                image(border,742,-500)
                rotate(180);
                image(border,23,500)
            pop()
            
            fill(r,0,0)
            text("Esc", 475,730)
            fill(255)
            text("Press  ", 405,730)
            text("to Exit", 525,730)
            
        }
}


function circle_function()
{
    //draws the static circle uses for optical illusion 1
    this.static = function (x,y)
    {
        push()
            translate(x,y) 
            this.circle1(0,0,70,150)
            this.circle2(0,0,140,0)
        pop()
        
        
    }
    
     this.dynamic1 = function (x,y) //draws the first dynamic circle
    {
        push()
            translate(x,y)
            rotate(angle) //rotate is using the angle variable so the user can control how fast it spins
            angle = angle + num + num2; //the angle variable will increase by 10 every time the draw function refreshes 
            this.circle1(0,0,70,150)//displays circle 1 , the first 2 numbers are its x and y values, the next 2 decides its rotation
            this.circle2(0,0,140,0)//displays circle 2 above circle 1 
        pop()
        
        
    }
     
     this.dynamic2 = function (x,y) //draws the second dynamic circle
    {
        push()
            translate(x,y)
            rotate(angle)  
            angle = angle + num + num2; 
            this.circle1(0,0,260,150)
            this.circle2(0,0,140,0)
            this.circle3(0,0,175,0)
        pop()
        
        
    }
    
        this.circle1 = function (x,y,a,b) //x and y controls the x and y coordinates, a and be controls the rotation of each arc used to create the circle
    {
        push()
            angleMode(DEGREES)
            rotate(a)
            fill(255)
            arc(x, y, 180, 180, 90, PI);

            rotate(b)
            fill(0)
            arc(x, y, 180, 180, 182, PI);
        pop()

        fill(220)
        circle(x,y,90)
    }
    
    this.circle2 = function (x,y,c,d)
    {
        push()
            angleMode(DEGREES)
            rotate(c)
            fill(255)
            arc(x, y, 175, 175, 3.2, PI);

            rotate(d)
            fill(0)
            arc(x, y, 175, 175, 182, PI);
        pop()

        fill(255)
        circle(x,y,90)

        fill(220)
        circle(x,y,90)
    }
    
    this.circle3 = function (x,y,e,f)
    {
        noStroke()
        push()
            angleMode(DEGREES)
            rotate(e)
            fill(255)
            arc(x, y, 100, 97, 3.2, PI);

            rotate(f)
            fill(0)
            arc(x, y, 100, 97, 100, PI);
        pop()


        fill(255)
        rotate(38)
        arc(x,y,100,100,200,PI + QUARTER_PI, OPEN)


        fill(220)
        circle(x,y,95)
    }
    

    
}

//this function is used to display what the user will see when they inspect optical illusion painting1
function illusion_circle()
{
     stroke(0)
    //rect(0,210,1000,180)
    
    if (random(11) < 10) 
    {
        circles.push(new circle_function());
    }
    
  
    
    noStroke()
    //num = 5
    circles[0].dynamic1(500,200)
    fill(0)
    text("When this circle spins towards the left or the right it will look like the circle is shrinking or growing in size when its simply not", 200,340, 620)
    
    circles[1].dynamic1(300,500)
    circles[0].dynamic2(700,500)
    text("Press Q to spin towards the left, Press E to spin towards the right", 330,640, 430)
    text("Speed = " + num2, 450,680)
    
    stroke(0)
    strokeWeight(3)
    line(200,730, 805,730)
    line(200,910, 805,910)
    noStroke()
    
    circles[2].dynamic1(300,820)
    circles[1].dynamic2(500,820)
    circles[3].dynamic1(700,820)
    text("The lines are to prove the circle is infact not increasing/decreasing in size", 220,950, 600)
    text("optical illusions often occur due to the limitations in our visual system. This is because our eyes/brain often makes 'shortcuts' to overcome our visual limitations, hence optical illusions being a thing", 220, 1000, 600)
    
}

function staticCircle()//thsi function is used to display a static version of the circle so it cant spin 
{
    noStroke()
    //rect(0,210,1000,180)
    
    if (random(10) < 10) 
    {
        circles.push(new circle_function());
    }
    
    circles[0].static(-635,375)
}

function spiral(x,y)//used to draw a spiral that constantly spins for optical illusion 2
{
        push()
            imageMode(CENTER);
            angleMode(DEGREES);
            translate(x,y)
            rotate(angle) 
            angle = angle + num + num3; 
            image(spiralImg,0,0)
        pop()
}

function gestalt1(x,y1,y2,y3,y4,y5,y6)
{
    var c
    
    if(mapCol){
        c = map(mouseX, 0, width, 0, 255)
    }
    else{c = 0}
    
    
    push()
    translate(x,y1)
    gestalt1_loop(255,0,c)
    pop()
    
    push()
    translate(x,y2)
    gestalt1_loop(255,255,c)
    pop()
    
    push()
    translate(x,y3)
    gestalt1_loop(255,165,c)
    pop()
    
    push()
    translate(x,y4)
    gestalt1_loop(c,255,255)
    pop()
    
    push()
    translate(x,y5)
    gestalt1_loop(c,255,200)       
    pop()
    
    push()
    translate(x,y6)
    gestalt1_loop(c,100,255)
    pop()
}



function gestalt1_loop(r,g,b)
{
    //[2] From lines 766 to 773 was helped created by the generative drawing 4b_modulateEverything_complete code (it was used to make the lines wave)
    for(var i = 0; i < 15; i++)
    {
        stroke(r,g,b);
        strokeWeight(2)
        line(325 + i * 15, cos(speed * 3 + i) * 50, 425 + i * 30,i);
    }
        speed += 0.001;
}

function gestalt1_code()
{
    angleMode(RADIANS)
    translate(0,scrollY) //allows the user to scroll up and down in the inspected painting
    fill(0)
    rect(210,850,575,950)
    textSize(24)
    text("Laws of Similarity and Proximity", 290,150, 500)
    textSize(16)
    text("What are they?", 400,250)
    text("EXAMPLE", 445,750)
    textSize(14)
    text("The law of Similarity is when the human eye creates a relationship between elements that share a similar trait. This can be the colour of the elements, the size or shape. Our brains craft a link between similar elements naturally as it essentially 'fills in the gaps'.", 200, 300, 620)

    text("The law of Proximity is when our eyes build a connection between elements that are within close proximity to each other. The use of whitespace is the determining factor that allows our eyes to associate elements in groups. An example can be as simple as creating paragraphs. When looking at a paragraph you know what lines of text are associated with each paragraph as they are within close proximity. In addition by using blank space in between each paragraph allows us to differentiate them from each other. ", 200, 460, 620)

    text("Press and hold space and move mouse to change colour of the lines ", 200, 800 , 630)

    text("The example above uses both the law of similarity and the law of proximity. Similarity is being represented via the colour of the lines. Having lines that are within close proximity to each other share the same colour makes it easier to link the lines. proximity is being represented via the distance that separates each group of lines and the distance between each line per group. keeping the waving lines close to each other allows our eyes to link them with each other and having some distance between each overall group also allows us to differentiate each group from each other", 200,1850,615)

    gestalt1(-90,950,1100,1250,1400,1550, 1700)
}

function gestalt2_code()
{
    translate(0,scrollY)
                
    textSize(24)
    text("Laws of Closure", 320,150)
    textSize(16)
    text("What is it?", 415,200)
    text("EXAMPLE", 445,480)
    textSize(14)
    text("The law of Closure is essentially how our eyes fill in the gaps for incomplete shapes/images. This is because when our eyes see an uncompleted shape it ignores the missing information and fills in the gaps. This means in reality, the shapes are still 'incomplete' but in our perspective, we can still identify them due to our eyes filling in the gaps.", 200, 250, 620)

    text(" Press and hold space to move the circle around ", 170, 520)

    text("The example above demonstrates the law of closure because it doent matter how many shapes are onfront of the circle, our eyes dont create a new shape it instead still views it as a circle", 200, 950, 630)

    stroke(0)
    strokeWeight(3)
    line(200,530, 805,530)
    line(200,910, 805,910)
    noStroke()

    rectMode(CENTER)
    fill(255)  
    if(em){
    ellipse(mouseX, mouseY + 350, 200)
    }

    else{ellipse(500,720, 200)}
    fill(215, 204, 200)
    square(220,700,120)
    square(520,600,120)
    circle(700,800,100)
    circle(500,850,60)
    triangle(450,800,500,730,550,800)
    stroke(215, 204, 200)
    strokeWeight(3)
    line(200,680, 805,680)
    line(200,780, 805,780)
    noStroke()
}

function gestalt3_code(x,y)
{
    
    var c;
    if(mapCol){
        c = map(mouseX, 0, width, 0, 255)
    }
    else{c = 0}
    
    translate(0,scrollY)
    textSize(24)
    text("Law of focal point", 290,150)
    textSize(16)
    text("What is it?", 415,200)
    text("EXAMPLE", 445,500)
    textSize(14)
    text("The law of focal point is essentially the first thing that grabs our eye's attention. this can be influenced by the size of the element, the colour of the element, or even the proximity of the element. For example, if there is a grid of 50 black squares but one of the squares is red, the red square will naturally grab your eye's attention first. This law is great to implement when creating a UI as allows the user to navigate through the UI at ease. ", 200, 250, 620)
    
    text("Hold space and move mouse to change colour",200, 530)
    
     text("The example above demonstates every time you glance at the grid you will always look at the red circles. this means the red circles are a focal point as they create the word 'hi' and their colour grabs the eyes attention immediatly as they can been seen as the anomaly. this is also proven as when you change the colour of the black circles the red ones still stands out", 200, 850, 620)

    push()
          translate(x,y)
            stroke(255)
            fill(0,c,c)
           
            for (var i = 0; i <= 170; i = i + 10) {//used to create a grid made out of circles
                for (var j = 0; j <= 140; j = j + 10) {

                    ellipse(20 + i + 1 * i, 20 + j + 0.5 * j, 20, 20);
                    
                    //statements makes some circles the colour red 
                    if (i < 20 && j < 100) { 
                        fill(255, 0, 0)
                    } else {
                        fill(0,c,c)
                    }

                    if (i < 110 && i > 80 && j < 100) {
                        fill(255, 0, 0)
                    }

                    if (j < 50 && j >30 && i < 100) {
                        fill(255, 0, 0)
                    }

                    if (i < 160 && i > 130 && j < 100) {
                        fill(255, 0, 0)
                    }
                }
            }
    
    
    
    pop()
}

/*
REFERENCES 
[1] From lines 185 to 217 the introduction to programming side scrolling code was used to help create srolling on the Y axis aswell as the X axis.  
[2] From lines 766 to 773 was helped created by the generative drawing 4b_modulateEverything_complete code (it was used to make the lines wave)
*/
