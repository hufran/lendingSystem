<template>
   <div class="aboutus">
     <my-header :title="title"></my-header>
     <div class="swiper-container" id="swiper-container2">
       <div class="swiper-wrapper">
         <div class="swiper-slide" :class="{activenav: active==0}">
           平台介绍</div>
         <div class="swiper-slide" :class="{activenav: active==1}">
           安全保障</div>
         <div class="swiper-slide" :class="{activenav: active==2}">
           保障机构</div>
         <div class="swiper-slide" :class="{activenav: active==3}">
           团队介绍</div>
         <div class="swiper-slide" :class="{activenav: active==4}">
           合作伙伴</div>
         <div class="swiper-slide" :class="{activenav: active==5}">
           联系我们</div>
       </div>
     </div>

     <div class="swiper-container" id="swiper-container3"  :style="{height: Height+'px'}">
       <div class="swiper-wrapper">
         <div class="swiper-slide slide-1">
           <h2>公司介绍</h2>
           <article>
             新毅网络科技有限公司（简称：新毅金融）是基于绿色金融、共享经济的互联网资产管理生态平台。专注于绿色清洁能源产业整体金融解决方案，倡导绿色参与感、并因此受益的绿色理念，为用户提供安全、灵活、稳健的投资收益产品。业务遍布北京、上海、深圳、天津、河北石家庄、廊坊等地。
           </article>
           <article>
             平台品牌是“718金融”，“718金融”根植于新毅控股，新毅控股致力于打造受人尊敬、国际一流的金融控股平台。旗下布局村镇银行、股权基金、证券基金、创投基金、资产管理、融资租赁、互联网金融等业务领域。其中，新奥基金依托在清洁能源领域的行业领先优势、管理体系优势、科研技术优势、运营网络优势、资本运作优势，借助基金团队成员多年与金融监管机构、境内外各大银行、基金公司、证券公司、信托公司、保险公司等金融机构以及大型机构投资者、企业（包括众多大型央企和国企）的良好合作关系，逐步形成了向大金融全产业链快速发展的骏马奔腾之势。截至目前，新奥基金已成功运作北京新奥建银能源发展基金、智能（天津）基金、宿迁恩贝基金、宿迁恒泽基金等10余支股权投资基金及大量资产管理、财务顾问业务，投资及资产管理规模近100亿元人民币，主要投资清洁能源、节能环保、资源综合利用、医疗健康、文化旅游和基础设施建设等领域。
           </article>
           <article>
             718金融•投资平台是由新毅金融运营的绿色互联网金融平台，通过O2O线上+线下、标准化+个性化的服务体系，为客户提供定制化的投资信息咨询服务。
           </article>
           <h2>使命愿景</h2>
           <h3>企业使命</h3>
           <p>新金融、新生活、新生态</p>
           <h3>企业愿景</h3>
           <p>打造值得信任，绿色智能生态的综合金融服务平台。</p>
           <h3>骏马文化</h3>
           <p>骏马是718金融的文化象征，骏马忠诚、有责任、可依赖，体现718金融一心一意为客户服务的初心；骏马高速奔跑而有耐性，体现718金融稳健诚信的经营风格；骏马颜值高，体现718金融屹立潮头，不甘落伍的互联网风范。</p>
           <h3>凤凰树品格</h3>
           <p>又叫凤凰木，亦称“红楹”、“火树”。树身有的高达二十米，树冠宽广。二回羽状复叶，羽片十至二十四对，每羽片有小叶二十至四十对，小叶片随圆形。夏季开花，总状花序，花大，红色，有光泽。荚果木质，长可达五十厘米。凤凰树原产于非洲马达加斯加岛。它的木材细密，质轻，有弹性，能耐腐。</p>
           <img src="https://creditmanager.b0.upaiyun.com/86319ff0fe3178fde0510870412307c3" width="80%"/>
           <p>《诗经•大雅》说的：“凤凰鸣矣，于彼高岗；梧桐生矣，于彼朝阳。”凤凰木——象征着纯洁的友谊和爱情。</p>
           <p>718金融要求员工象高大魁梧的凤凰树一样：坚韧细密、博大宽广、纯洁如斯。</p>
           <p>718金融会以坚韧细密的发展步伐对社会负责；以博大宽广的专业与合作伙伴共生息；718金融不忘初心、信心十足、开心工作，以纯洁如一的专一与客户长厮守。</p>

           <h2>商业模式</h2>
           <article>定位于互联网金融+绿色产业，与优质的环境友好型企业深度合作，提供全产业链的金融信息服务。</article>
           <h2>品牌诠释</h2>
           <article>718金融秉承共享价值、链接未来的理念，打造业务模式创新、用户生活方式创新、行业生态创新，以“新金融、新生活、新生态”为价值诉求，以绿色产业、舒畅生活方式、繁荣生态为品牌之魂，为全社会打造绿色金融、智慧金融、创新金融、价值金融的生生不息可持续发展共享平台！</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/679a24ad4171a67c2ee221a2e2c6b16e" width="70%"/>
           <p>718金融品牌核心要素：</p>
           <p>祥云</p>
           <p>祥云是代表性的中国文化符号，非常生动的诠释了718金融“财富共享、渊源共生、和谐共融” 的平台价值观；展现对客户、环境、社会、合作伙伴、员工美好的祝愿与祈福。</p>
           <p>水波纹</p>
           <p>水”生财、不断前进、财源滚滚，代表718金融对客户矢志不渝的财富增值护航风范。</p>
           <p>笔刷笔触</p>
           <p>智慧-文化底蕴的象征、传统民族精神文化的承载、可持续发展的使命，体现了718金融对传统金融专业与精神的传承，对民族文化精神的继承，在创新开放、共享价值的发展中，不忘初心，浓墨重笔写下可持续发展的环境友好型终极路径。</p>
           <h2>爆款产品</h2>
           <p>新毅贷</p>
           <p>一款专门为718金融用户定制的无抵押无担保的信用借款产品。</p>
           <h2>平台特色</h2>
           <h3>平台优势</h3>
           <p> 优质资产</p>
           <article>“718金融”互联网金融平台业务来自于清洁能源、节能环保领域的优质资产，新能源汽车消费借款、京津冀房产消费借款，以及来自于交易伙伴为国企、央企、上市公司的优质资产，以强大的企业实力和专业的风控体系保障投资、投资类金融产品的投资灵活、收益安全、风险可控、信息透明，让客户的小钱变大钱，死钱变活钱，以较小的投资获得更大的回报。</article>
           <p>精细服务</p>
           <article>“718金融”为中、高净值人群定制打造专属的金融投资产品及组合式财富管理顾问服务，提供7*24小时互联网在线服务；结合智能产品，提供主动关怀服务；提供互动性、参与性、体验性极佳的互联网产品体系；提供社交化、用户自主参与的民主金融服务体验，用我们贴心、专业、安全的金融服务理念打动客户的心，提升客户投资的幸福指数。</article>
           <p>资金护航</p>
           <article>“718金融”选择正规银行、证券、保险等大型金融机构，利用其强大的抗风险能力及成熟的风控体系，极大的降低了风险。</article>
           <article>“718金融”挑选优质的资产，银行级的21层风控审核，资金更安全，兑付有保障。</article>
           <article>718金融”资金由银行存管、银行级风控标准，兑付有保障，历史违约率为零，账户监管，质押率低，资金安全垫完整，安全可靠。</article>
           <article>“718金融”为广大投资者推出的质保服务保障机制。出资千万级质保基金并且随日后交易额增加逐步追加，当借款人出现逾期时，将启用质保服务转款对相应出借人进行偿付。
           </article>
           <p>系统安全</p>
           <article>系统采用云计算技术、国外知名机构颁发的服务器证书、128位密钥，前后台登录均使用图形验证码（彩色+扭曲+线条遮罩等干扰方式），连续5次登录失败直接锁定账号。成功及失败登录的来源（Web、App）、IP及相关信息后后台重点操作均保留操作日志记录。</article>
           <h2>业务频道</h2>
           <p>应收账款</p>
           <article>来自于国家支持绿色环保朝阳产业的国企、央企、上市公司应收账款融资、票据类资产融资项目；国企、央企、上市公司应付账款质押类资产。</article>
           <p>供应链金融</p>
           <article>应收账款衍生出来清洁能源、医疗器械、健康产业、3C、通信、环保等供应链融资。</article>
           <p>电子商票</p>
           <article>融资企业以其持有的银行承兑汇票提供质押担保向投资人融资。</article>
           <p>抵押类资产</p>
           <article>小额贷款公司、融资租赁公司、商业保理公司提供的优质资产。 </article>
         </div>
         <div class="swiper-slide slide-2">
           <!--<pre>-->
           <h2>安全保障</h2>
           <h3>担保机构</h3>
           <p>选择受金融局监管的实力担保机构，对投资项目提供合格的担保机构。</p>
           <h3>专业安全机制</h3>
           <p>
             1、担保机构准入和评级机制<br>
             借鉴领先的担保机构准入标准和评级方法，引入合格的担保机构 <br>
             2、质保服务保障机制<br>
             718金融设立质保服务制度，开立质保服务转款账户，为可能出现的极端情况，提供了多层安全保障<br>
             3、资金托管机制<br>
             引入第三方平台进行资金托管，不接手借贷资金，保障资金安全，回归中介本质<br>
             4、网络技术安全机制<br>
             256位安全加密<br>
             专业公司保障系统安全<br>
             第三方支付平台确保资金和交易数据安全<br>
             权威安全的电子印章和防篡改电子合同<br>
           </p>
           <h3>法律保障</h3>
           <article>718金融聘用了盈科律师事务所为常年法律顾问。</article>
           <article>盈科律师事务所，是一家全球化法律服务机构，总部设在中国北京，在中国大陆拥有33家办公室，在纽约、伦敦、维罗纳、米兰、布达佩斯、圣保罗、里约热内卢 、首尔、伊斯坦布尔、华沙、波兹南、格但斯克、墨西哥城、布鲁塞尔、特拉维夫、芝加哥、新加坡、迪拜、里斯本、马德里、瓦伦西亚 、莫斯科、香港、台北、雅典、摩纳哥、巴塞罗那等30个海外城市设有办公室，盈科律师事务所拥有5000名员工，致力于为客户提供全球商务法律服务，为客户创造价值。</article>
           <article>盈科在发展中坚持"以人为本"的人才战略，逐步形成了由专业律师人才、专业市场人才、专业管理人才组成的人才队伍，保障了律师事务所整体战略目标的实现。 业务范围涵盖国际贸易、海外投资、公司、资本证券、两岸事务、私募、投融资与并购、知识产权、房地产、环境保护、海商海事等专业领域。此外，盈科还聘请了在国内外法学理论及实务领域享有声誉的法学专家担任专家顾问。</article>
           <article>为客户提供满意的法律服务是我们矢志不渝的目标，盈科坚持"以客户为导向"，专门成立"客户服务中心"和"投融资中心"，始终以客户的需求为关注焦点，以顾客满意为工作目标，充分发挥盈科全球化法律服务体系的优势，整合全球各地办公室、各专业部门和全体律师的资源，不仅为客户解决法律问题，还为客户提供商业机会、促进客户合作，为客户提供专业化、综合性的法律服务。盈科全球化优质的法律服务赢得了客户的信赖，在客户拥有量、市场份额、创收总额等方面都有显著提升，目前，律所已加入了150多家行业和企业协会，为70000多家海内外企业提供法律服务。</article>

         </div>
         <div class="swiper-slide slide-3">
           <img alt="" src="https://creditmanager.b0.upaiyun.com/bd30ead53f4f57f9c91d4184b4552faf" style="height:50px; width:175px">
           <article>盈科律师事务所，是一家全球化法律服务机构，总部设在中国北京，在中国大陆拥有33家办公室，在纽约、伦敦、维罗纳、米兰、布达佩斯、圣保罗、里约热内卢 、首尔、伊斯坦布尔、华沙、波兹南、格但斯克、墨西哥城、布鲁塞尔、特拉维夫、芝加哥、新加坡、迪拜、里斯本、马德里、瓦伦西亚 、莫斯科、香港、台北、雅典、摩纳哥、巴塞罗那等30个海外城市设有办公室，盈科律师事务所拥有5000名员工，致力于为客户提供全球商务法律服务，为客户创造价值。</article>
           <article>盈科在发展中坚持"以人为本"的人才战略，逐步形成了由专业律师人才、专业市场人才、专业管理人才组成的人才队伍，保障了律师事务所整体战略目标的实现。 业务范围涵盖国际贸易、海外投资、公司、资本证券、两岸事务、私募、投融资与并购、知识产权、房地产、环境保护、海商海事等专业领域。此外，盈科还聘请了在国内外法学理论及实务领域享有声誉的法学专家担任专家顾问。</article>
           <article>为客户提供满意的法律服务是我们矢志不渝的目标，盈科坚持"以客户为导向"，专门成立"客户服务中心"和"投融资中心"，始终以客户的需求为关注焦点，以顾客满意为工作目标，充分发挥盈科全球化法律服务体系的优势，整合全球各地办公室、各专业部门和全体律师的资源，不仅为客户解决法律问题，还为客户提供商业机会、促进客户合作，为客户提供专业化、综合性的法律服务。盈科全球化优质的法律服务赢得了客户的信赖，在客户拥有量、市场份额、创收总额等方面都有显著提升，目前，律所已加入了150多家行业和企业协会，为70000多家海内外企业提供法律服务。</article>

         </div>
         <div class="swiper-slide slide-4">
           <h2>团队介绍</h2>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/23abbe3be7a94b249a58728836b2e9a1" style="height:211px; width:160px">
           <h3>郭伟 高级合伙人 高级副总裁</h3>
           <article>北京大学光华管理学院MBA、兰州大学哲学系哲学学士，曾历任中央直属机关人事局人事政策研究；和君创业管理咨询公司管理咨询；新奥集团首席人资总监；中国远大集团人资总监；华夏基石管理咨询公司业务副总裁、高级合伙人。郭伟先生在人力资源方面，具有非常接地气的实战管理经验，对企业品牌文化建设、人力资源架构设计、绩效薪资管理体系等方面经验丰富。</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/6974fa68c0ad832f8b24cd8c36a1b088" style="height:211px; width:160px">
           <h3>尚明轩 合伙人 首席财务官（CFO）</h3>
           <article>天津财经大学财政学专业毕业，历任新奥集团信息化项目部项目经理、部门经理；新奥财务有限责任公司主管会计；新奥投资基金管理（北京）有限公司财务经理，在财务管理方面具有丰富的专业经验。其人做事严谨、谨慎、仔细、细心，为公司财务管理做了很多实实在在的工作。</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/50a42c456645505ec02b5ace5289d4f1" style="height:211px; width:160px"><h3></h3>
           <h3>安宏斌 合伙人 首席法务官（CLO）</h3>
           <article>西北政法大学法学学士，律师，曾在廊坊银行从事信贷工作；曾历任新奥置业集团法律总监、北部湾旅游股份法律总监、新奥能源法律总监。安宏斌先生拥有15年的企业法律风险防范与管理经验，拥有金融、房地产、旅游与能源行业丰富从业经验，在大型企业集团法律风险防范体系建设、争议纠纷解决及法务团队建设等方面经验丰富。</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/c96bf7424fc0780bc694e88a7d16acf8" style="height:213px; width:161px">
           <h3>章昌斌 合伙人 首席产品官（CPO）</h3>
           <article>武汉大学企业管理硕士，有十余年金融从业经验，曾先后就职于农业银行、中诚信、中融国际信托、平安集团陆金所、民生易贷、万达电商。熟悉银行信托业务及风险管理体系；有互联网金融产品及模式设计、开发、升级和业务拓展的丰富工作经验。</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/f083caaa97b3151181e447a6db08bff3" style="height:210px; width:160px">
           <h3>张精伟 合伙人 首席风险官（CRO）</h3>
           <article>中国人民大学财政金融学院金融学硕士研究生。先后担任中国银行支行中石油支行副行长、广发银行东二环支行副行长、财加公司风控总监、产品总监。张精伟先生在金融系统工作11年，拥有从支行到分行的多岗位工作经历，长期从事银行信用风险控制工作，在银行风险管理的组织流程控制、运营机制、制度体系、风险识别、资产保全等方面工作经验丰富。</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/3c8cd7961c976b3cc5cff63e5ac9746a" style="height:211px; width:160px">
           <h3>李猛 合伙人 技术部总监</h3>
           <article>北京大学法律硕士、湖南科技大学计算机科学与技术本科，具有三年以上技术总监工作经验、三年部门管理经验、多年项目管理经验；具有十年B/S模式的开发经验，代码编写经验和软件行业工作经验；负责过两个中型项目、一个大型项目及十几个小型项目的管理工作，具有面向对象分析、设计、开发能力(OOA、OOD、OOP)；精通JAVA语言、常用数据库如Sql Server、Oracle、MySQL等的开发，具备独立开发能力，熟悉CMMI、PMP，具备良好的电信、金融、协作通信行业背景。</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/c98dc5db644f5d92fba54c5abe60c7d6" style="height:211px; width:160px">
           <h3>焦亚林 合伙人 人力资源总监</h3>
           <article>西安翻译学院国际贸易专业，人力资源管理师（一级），从事人力资源工作近十年，具有丰富的人力资源管理经验，为人亲和，友善，做事干练、高效，为企业人力资源的补充、培养、储备、建设方面做出了卓越的贡献。</article>
           <img alt="" src="https://creditmanager.b0.upaiyun.com/5755ec42c8bc4361c00f523ef079bbab" style="height:211px; width:160px">
           <h3>吴天鹏 高级顾问</h3>
           <article>中国人民大学财政系国际金融专业，拥有高级经济师的职业资格，历任加拿大中国银行高级副总裁；中国银行授信评审委员会评审委员、副主任；中国银行总行全球金融市场部副总经理、总监；中国银行保险业务领导小组成员；中国银行总行金融机构部资深专家；《国际金融》常务副主编。曾率团参加亚洲开发银行（ADB）、泛美开发银行（IDB）、拉丁美洲银行联盟（FELABAN）等国际金融组织年会，并多次随团参加和出席国际金融协会（IIF）、环球金融电讯协会（SWIFT）、国际营运银行业务年会（SIBOS）、中加贸易理事会（CCBC）年会等国内外大型经济、金融专业研讨会、论坛（曾多次作为演讲嘉宾）及跨境人民币使用、产品推介会等各类社会交往与营销活动。</article>

         </div>
         <div class="swiper-slide slide-5">
           <img alt="云信（北京）咨询有限公司" src="https://creditmanager.b0.upaiyun.com/e861a86a63fdba1ee31664f173cce1e6" style="height:50px; width:175px">
           <article>云信（北京）咨询有限公司 成立于2013年4月，致力于为机构提供专业的互联网金融核心技术服务。公司专注于金融产品模型研发，创新性金融产品设计，线上金融产品交易平台搭建，以及后台的业务风控流程体系的咨询与实施业务。</article>
           <img alt="网银在线" src="assets/image/act/chinaBanklogo.png">
           <article>网银在线（北京）科技有限公司（以下简称网银在线）为京东集团全资子公司，是国内领先的电子支付解决方案提供商，专注于为各行业提供安全、便捷的综合电子支付服务。</article>
           <article>自2003年成立，现有员工1200余人。网银在线在中国支付清算协会中任常务理事单位、任中国服务贸易协会商业保理专业委员会副主任单位、获中国证券监督委员会批复基金销售支付结算机构。公司于2011年5月3日首批荣获央行《支付业务许可证》，并获得中华人民共和国增值电信业务经营许可证、中金国盛非金融机构支付业务设施技术认证、 中关村高新技术企业、海淀区创新企业、计算机软件著作权登记证书等多个认证。 2014年获得了国家外管局颁发的”跨境支付牌照“。业务覆盖到酒店、机票、留学汇款以及货物进出口贸易的结售汇与购付汇，为企业提供全方位的互联网金融支付解决方案。同时，我们立足于金融创新，不断为用户提供极致便捷的支付体验，为商户提供安全快捷的在线支付、结算服务及完美行业解决方案。
           </article>

         </div>
         <div class="swiper-slide slide-6">
           <h3>媒体采访</h3>
           <p>
             如果您有媒体采访需求，请将您的媒体名称、采访提纲。<br>
             联系方式发送至：zengbo@nnfe.com<br>
             我们会尽快与您联系。
           </p>
           <h3>商务合作</h3>
           <p>
             如果您希望与我们建立商务合作，请简要描述合作意向。<br>
             联系方式发送至：luyanyan@nnfe.com<br>
             我们会尽快与您联系。
           </p>
           <h3>企业融资</h3>
           <p>
             如果您希望通过718金融•投资满足融资需求,请将您的企业和项目资料。<br>
             联系方式发送至：zhangjingwei@nnfe.com <br>
             我们会尽快与您联系。
           </p>
           <h3>联系我们</h3>
           <P>
             新毅网络科技有限公司北京西城分公司<br>
             地址：北京市西城区广安门外大街168号1幢17层1-2006<br>
             客服电话：4001-718-718<br>
             客服邮箱：service@nnfe.com
           </P>
           <img src="https://creditmanager.b0.upaiyun.com/6559f155946708ec4a9168d08d25dfba" alt="" width="80%">
         </div>
         <!--<div class="swiper-slide slide-7">-->
         <!--<h3>重大事件</h3>-->
         <!--</div>-->
       </div>
     </div>
   </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  import Swiper from 'swiper/dist/js/swiper.min'
  export default {
    data () {
      return {
        title: '关于我们',
        active: 0,
        Height: 4304
      }
    },
    created: function(){

    },
    mounted:function () {
      var that = this;
      var swiper2= new Swiper('#swiper-container2',{
         watchSlidesProgress: true,
         watchSlidesVisibility: true,
         slidesPerView : 3,
         spaceBetween:30,
         slideToClickedSlide: true,
         on:{
           click: function(){
             that.active = this.clickedIndex
             swiper3.slideTo(this.clickedIndex)
             that.handleChange(this.clickedIndex)
           }
         }
       })
      var swiper3= new Swiper('#swiper-container3',{
          on:{
            slideChange: function(){
              that.active = this.activeIndex
              swiper2.slideTo(this.activeIndex)
              that.handleChange(this.activeIndex)
            }
          }
       })
    },
    methods:{
      handleChange: function (index) {
         if(index == 1){
          this.Height = 1514;
        }else if(index == 2){
          this.Height = 990;
        }else if(index == 3){
          this.Height = 3739;
        }else if(index == 4){
          this.Height = 882;
        }else if(index == 5){
          this.Height = 946;
        }else{
          this.Height = 4304;
        }
      },
    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
.aboutus{
  width:100%;
  height: 100%;
}
#swiper-container2{
  height:1rem;
  line-height: 1rem;
  background-color: #e0e0e0;
}
#swiper-container2 .swiper-slide{
  background-color: #e0e0e0;
  font-size: 0.4rem;
}
#swiper-container2 .activenav{
  color: #379aff!important;
}

#swiper-container3 .swiper-slide{
  padding-top:1.3rem;
  background-color:#fff;
  text-align: left;
}
.slide-1,.slide-2,.slide-3,.slide-4,.slide-5,.slide-6{padding-bottom:3rem}

#swiper-container3 .swiper-slide h2{
  font-size:0.32rem;
  color:#5ca0f9;
  text-align: center
}
#swiper-container3 .swiper-slide article,#swiper-container3 .swiper-slide p{
  color:#777;
  font-size:0.2666667rem;
  line-height:0.7rem;
  text-indent: 2em;
  margin-bottom:0.5rem;
  padding:0 0.5rem;
}
#swiper-container3 .swiper-slide h3{
  font-size:0.2666667rem;
  color:#000;
  text-align: left;
  padding:0 0.5rem
}
#swiper-container3 .swiper-slide img{text-align:center;margin:0.3rem auto;display:block}
#swiper-container3 .swiper-slide p{text-indent:0;}
.slide-1{height:55rem}
</style>
