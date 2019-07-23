const request = require("request");
const tempy = require("tempy");
const gm = require("@tohru/gm").subClass({
    imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    // message.reply("this command is currently disabled due to arising technical issues.");
    const image = await client.getImage(message).catch(error => {
        message.reply("you need to provide an image to add some magik!");
        console.log(error);
    });
    const magikResize = tempy.file({
        extension: "png"
    });
    const magikTemp = tempy.file({
        extension: "png"
    });
    const magikOutput = tempy.file({
        extension: "png"
    });
    if (image !== undefined) {
        const processMessage = await message.channel.send(`${client.emojis.get("393852367751086090")} Processing... This might take a while`);
        gm(request(image)).resize(800, 800).strip().write(magikResize, (error) => {
            if (error) throw new Error(error);
            gm(magikResize).out("-liquid-rescale", "400x400").strip().write(magikTemp, (error) => {
                if (error) throw new Error(error);
                gm(magikTemp).out("-liquid-rescale", "1200x1200").strip().write(magikOutput, async (error) => {
                    if (error) throw new Error(error);
                    await message.channel.send({
                        files: [{
                            attachment: magikOutput,
                            name: "magik.png"
                        }]
                    });
                    processMessage.delete();
                });
            });
        });
    }
};

exports.aliases = ["imagemagic", "imagemagick", "imagemagik", "magic", "magick", "cas", "liquid"];